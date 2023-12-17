import { ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import * as argon from "argon2"
import { RegisterDTO, LoginDTO } from "./dto";
import { JwtService } from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";

@Injectable({})
export class AuthService {
    constructor (
        private prismaService: PrismaService, 
        private jwtService: JwtService, 
        private configService: ConfigService
    ) {}

    async register(registerDTO : RegisterDTO) {
        // check existed email
        const checkEmail = await this.prismaService.user.findUnique({
            where: {
              email: registerDTO.email,
            },
        });
        if (checkEmail) 
            throw new HttpException('Email already in use', HttpStatus.CONFLICT);

        //hash
        const hashedPassword = await argon.hash(registerDTO.password);

        // add DB
        const user = await this.prismaService.user.create({
            data : {
                email : registerDTO.email,
                hashedPass: hashedPassword,
                firstName : registerDTO.firstName,
                lastName : registerDTO.lastName,
            }, 
            // select field to show as response
            select : {
                id: true,
                email: true,
                createdAt : true,
            }
        });
        return await this.convertToJwt(user.id, user.email);
    }

    async login(loginDTO : LoginDTO) {
        // check existed email
        const user = await this.prismaService.user.findUnique({
            where: {
              email: loginDTO.email,
            },
        });
        if (!user) 
            throw new ForbiddenException('Email not found');

        const checkPassword = await argon.verify(user.hashedPass, loginDTO.password)
        if (!checkPassword) 
            throw new ForbiddenException('Invalid password');

        delete user.hashedPass; // xoa trong obj response
        return await this.convertToJwt(user.id, user.email);
    } 

    // create JWT token
    async convertToJwt (userId : number, email: string) : Promise<{token : string}> {
        const payload = {
            sub : userId,
            name: email,
        }
        const jwtString = await this.jwtService.signAsync(payload, {
            expiresIn : '10m',
            secret : this.configService.get('JWT_SECRET')
        }); 
        return {
            token : jwtString,
        };
    }
}