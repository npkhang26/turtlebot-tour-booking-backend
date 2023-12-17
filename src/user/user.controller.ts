import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/decorator';
import { User } from '@prisma/client';

@Controller('user')
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    me(@GetUser() user : User) {
        return user;
    }
}
