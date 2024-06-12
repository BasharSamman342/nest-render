import { Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from 'src/user/user.service';
import { genSalt, hash } from 'bcrypt';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '@prisma/client';
import { MailerService } from '@nestjs-modules/mailer';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private mailService: MailerService,
  ) {}
  async signUp(data: SignUpDto) {
    const salt = await genSalt();
    const pwd = await hash(String(data.password), salt);
    const user = await this.userService.createOne({ ...data, password: pwd });
    return user;
  }

  async signIn(signIn: SignInDto) {
    const user = await this.userService.validateUser(
      signIn.email,
      signIn.password,
    );
    const payload = {
      id: user.id,
      email: user.email,
    };
    const token = await this.jwtService.sign(payload);
    const { password, ...result } = user;
    return { ...result, token };
  }

  async updateProfile(data: UpdateProfileDto, user: User) {
    // const message = `Forgot your password? If you didn't forget your password, please ignore this email!`;
    // return await this.mailService.sendMail({
    //   from: 'bashar@mail.com',
    //   to: 'msamman@kashier.io',
    //   subject: `How to Send Emails with Nodemailer`,
    //   text: message,
    // });
    return this.userService.updateProfile(data, user);
  }

  async resetPassword(data: ResetPasswordDto, user: User) {
    return await this.userService.updatePassword(data, user);
  }
}
