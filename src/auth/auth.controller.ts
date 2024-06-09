import { Body, Controller, HttpCode, HttpStatus, Post, Res, Response } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private authService:AuthService
    ){}
    @Post("sign-up")
    async signUp(@Body() signUpDto:SignUpDto){
        return this.authService.signUp(signUpDto)
    }

    @HttpCode(HttpStatus.OK)
    @Post("sign-in")
    async signIn(@Body() signInDto:SignInDto){
        return this.authService.signIn(signInDto)
    }
}
