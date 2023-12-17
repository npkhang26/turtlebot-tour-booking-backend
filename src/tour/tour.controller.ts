import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { TourService } from './tour.service';
import { InsertTourDTO, UpdateTourDTO } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';

@UseGuards(AuthGuard('jwt'))
@Controller('tours')
export class TourController {
    constructor(private TourService: TourService) {}

    @Get()
    get (@GetUser('id') userId : number) {
        return this.TourService.get(userId);
    }

    @Get(':id')  // /Tour/123
    getById (@GetUser('id') userId: number, @Param('id', ParseIntPipe) TourId : number) {
        return this.TourService.getById(userId, TourId);
    }

    @Post("add")
    insert(@GetUser('id') userId : number, @Body() body: InsertTourDTO) {
        return this.TourService.insert(userId, body);
    }

    @Patch('update/:id') 
    // ParseIntPipe : validate TourId in number 
    updateTourById(@GetUser('id') userId : number, @Param('id', ParseIntPipe) TourId : number, @Body() body: UpdateTourDTO) {
        return this.TourService.updateById(userId, TourId, body);
    }

    @Delete('delete/:id') 
    deleteTourById(@GetUser('id') userId : number, @Param('id', ParseIntPipe) TourId : number) {
        return this.TourService.deleteById(userId, TourId);
    }
}
