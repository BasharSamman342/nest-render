import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Put,
  Req,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User as UserType } from '@prisma/client';
import { User } from 'src/user/user.decorator';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @UseGuards(AuthGuard())
  @Put('update-profile')
  async updateProfile(@Body() data: UpdateProfileDto, @User() user: UserType) {
    // return req.user;
    return await this.authService.updateProfile(data, user);
  }

  @UseGuards(AuthGuard())
  @Put('reset-password')
  async resetPassword(@Body() data: ResetPasswordDto, @User() user: UserType) {
    return await this.authService.resetPassword(data, user);
  }
}
