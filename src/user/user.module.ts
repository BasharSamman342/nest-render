import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[PassportModule],
  providers: [UserService,PrismaService],
  exports:[UserService],
  controllers: []
})
export class UserModule {}
