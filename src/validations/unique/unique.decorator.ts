import { Injectable, SetMetadata } from '@nestjs/common';
import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { UserService } from 'src/user/user.service';

export function Unique(validationOptions?:ValidationOptions){
 return function (object:any,propName:string) {
    registerDecorator({
        name:"UserExists",
        target:object.constructor,
        propertyName:propName,
        options:validationOptions,
        validator:UserExistsRule
    })
 }
}


@ValidatorConstraint({name:"UserExists",async:true})
@Injectable()
export class UserExistsRule implements ValidatorConstraintInterface {
    constructor(
        private userService:UserService,
        private i18nService:I18nService
    ){}
    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const user = await this.userService.find({email:value})
        if (user) {
            return false
        } else {
            return true            
        }
    }

    defaultMessage(validationArguments?: ValidationArguments): string {
        return this.i18nService.t("messages.user_already_exists")
    }
}