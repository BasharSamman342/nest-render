import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
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

    async createOne(values:SignUpDto){
        try {
            const user = await this.prismaService.user.create({data:{...values }})
            return user
        } catch (error) {
            throw new BadRequestException(error)
        }
    }
}
