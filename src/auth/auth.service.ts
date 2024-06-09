import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { genSalt, hash } from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
    constructor(
        private userService:UserService
    ){}
    async signUp(data:SignUpDto){
        const salt = await genSalt()
        const pwd = await hash(String(data.password),salt)
        const user = await this.userService.createOne({...data,password:pwd})
        return user
    }

    async signIn(signIn:SignInDto){
        
    }
}
