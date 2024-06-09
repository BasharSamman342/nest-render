import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-local";
import { UserService } from "src/user/user.service";

@Injectable()

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService:UserService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET,
        })
    }
    async validate(email:string,pwd:string){
        const user = await this.userService.validateUser
        return user
    }
}