import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';

@Global() // use this module everywhere
@Module({
  providers: [PrismaService, ConfigService],
  exports: [PrismaService], // other module can use
})
export class PrismaModule {}
