import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt } from "passport-jwt";
import { Strategy } from "passport-jwt";
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
            usernameField: 'email',
            passwordField: 'password',
        })
    }
    async validate(payload:any):Promise<any>{
        const user = await this.userService.validateUser(payload.email)
        return user
    }
}