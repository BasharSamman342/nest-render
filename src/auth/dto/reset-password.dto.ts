import { IsString, MaxLength, MinLength } from 'class-validator';
import { SamePassword } from 'src/validations/same_password/same_password.decorator';

export class ResetPasswordDto {
  @MinLength(8)
  @MaxLength(20)
  @IsString()
  password: string;

  @MinLength(8)
  @MaxLength(20)
  @IsString()
  @SamePassword()
  password_confirmation: string;
}
