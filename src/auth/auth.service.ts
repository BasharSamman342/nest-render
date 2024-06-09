import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { genSalt, hash } from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService,
        private jwtService:JwtService
    ){}
    async signUp(data:SignUpDto){
        const salt = await genSalt()
        const pwd = await hash(String(data.password),salt)
        const user = await this.userService.createOne({...data,password:pwd})
        return user
    }

    async signIn(signIn:SignInDto){
        const user = await this.userService.validateUser(signIn.email,signIn.password)
        const payload = {
            id:user.id,
            email:user.email
        }
        const token = await this.jwtService.sign(payload)
        const {password,...result} = user
        return {...result,token}
    }
}
