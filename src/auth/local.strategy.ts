import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { UserService } from "src/user/user.service";

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService:UserService
    ){
        super()
    }
    async validate(email:string,pwd:string){
        const user = await this.userService.validateUser
        return user
    }
}