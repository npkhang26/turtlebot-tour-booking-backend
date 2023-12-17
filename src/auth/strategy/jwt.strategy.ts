import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    // add jwt in every request 
    constructor(configService: ConfigService, public prismaService: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //   ignoreExpiration: false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: { sub: number, name: string }) {
        const user = await this.prismaService.user.findUnique({
            where : {
                id : payload.sub,
            },
        });
        delete user.hashedPass; 
        return user;
    }
}