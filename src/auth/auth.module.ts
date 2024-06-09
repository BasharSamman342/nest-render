import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserExistsRule } from 'src/validations/unique/unique.decorator';

@Module({
  controllers: [AuthController],
  imports:[UserModule],
  providers: [AuthService,UserService,PrismaService,UserExistsRule]
})
export class AuthModule {}
