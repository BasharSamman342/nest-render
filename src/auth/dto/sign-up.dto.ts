import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"
import { Unique } from "src/validations/unique/unique.decorator"

export class SignUpDto{
    @IsNotEmpty()
    @IsString()
    first_name:string

    @IsNotEmpty()
    @IsString()
    last_name:string

    @IsNotEmpty()
    @IsEmail()
    @Unique()
    email:string

    @IsNotEmpty()
    @MinLength(8)
    @MaxLength(20)
    password:string
}