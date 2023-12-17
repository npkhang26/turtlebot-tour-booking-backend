import { BadRequestException, ForbiddenException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertTourDTO, UpdateTourDTO } from './dto';

@Injectable()
export class TourService {
    constructor (private prismaService: PrismaService) {}
    async get(userId: number) {
        let tour = await this.prismaService.tour.findMany({
            where : {
                userId
            }
        })
        return tour;
    }

    async getById (userId: number, tourId : number) {
        let tour = await this.prismaService.tour.findUnique({
            where: {
                // id: Number(tourId),
                id: tourId,
                userId
            }
        });
        if (!tour) 
            throw new BadRequestException('Tour ID not found.') 
        return tour;
    }

    async insert(userId: number, body: InsertTourDTO) {
        let insertTour = this.prismaService.tour.create({
            data : {
                // fromStation : parseInt(body.from_station),
                // toStation  : parseInt(body.to_station),
                fromStation : 1,
                toStation  : 2,
                userId : userId,
            }, 
            select : {
                id: true,
                createdAt : true,
            }
        });
        return insertTour;
    }

    async updateById(userId: number, tourId : number, body: UpdateTourDTO) {
        let findTour = await this.prismaService.tour.findUnique({
            where: {
                id: Number(tourId),
                userId
            }
        });
        if (!findTour) 
            throw new BadRequestException('Tour ID not found.') 

        let tour = await this.prismaService.tour.update({
            where: {
                id: Number(tourId),
            },
            data : {
                title : body.title,
                description : body.description,
                url : body.url,
            }
        });
        if (!tour) 
            throw new BadRequestException('Tour update failed.') 
        return tour;
    }

    async deleteById(userId : number, tourId : number) {
        let findTour = await this.prismaService.tour.findUnique({
            where: {
                id: Number(tourId),
                userId
            }
        });
        if (!findTour) 
            throw new BadRequestException('Tour ID not found.') 
        let deleteTour = await this.prismaService.tour.delete({
            where : {
                id: Number(tourId),
            }
        })
        return deleteTour;
    }}
