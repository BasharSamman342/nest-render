import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';
import { I18nService } from 'nestjs-i18n';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { UpdateProfileDto } from 'src/auth/dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
    constructor(
        private prismaService:PrismaService,
        private i18nService:I18nService
    ){}

    async findOrFail(credentials:any){
        const user = await this.prismaService.user.findUnique({where:credentials})
        if (!user) {
            throw new NotFoundException(this.i18nService.t("messages.record_not_found"))
        }
        return user
    }

    async find(credentials:any){
        const user = this.prismaService.user.findUnique({where:credentials})
        return user
    }

    async validateUser(email:string,pwd?:string){
        const user = await this.findOrFail({email:email})
        // const isMatched = compare(pwd,user.password)
        // if (!isMatched) {
        //     throw new UnauthorizedException(this.i18nService.t("validations.password_not_match"))
        // }
        return user
    }

    async createOne(values:SignUpDto){
        try {
            const user = await this.prismaService.user.create({data:{...values }})
            return user
        } catch (error) {
            throw new BadRequestException(error)
        }
    }

    async updateProfile(updateProfile:UpdateProfileDto,user:User){
        const res = await this.prismaService.user.update({
            data:{
                first_name:updateProfile.first_name,
                last_name:updateProfile.last_name
            },
            where:{
                id:user.id
            }
        })

        return res
    }
}
