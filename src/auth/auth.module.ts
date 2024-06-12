import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserModule } from 'src/user/user.module';
import { UserExistsRule } from 'src/validations/unique/unique.decorator';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SamePasswordRule } from 'src/validations/same_password/same_password.decorator';

@Module({
  controllers: [AuthController],
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
    UserModule,
    // PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    AuthService,
    UserService,
    PrismaService,
    UserExistsRule,
    LocalStrategy,
    SamePasswordRule,
  ],
})
export class AuthModule {}
