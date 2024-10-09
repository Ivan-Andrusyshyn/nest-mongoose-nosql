import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

import { User, UserDocument } from 'src/schemas/user.schema'; // Путь к вашей схеме
import { UserDto } from './dto/user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-accessToken.dto';
import { CreateForgotPasswordDto } from './dto/create-forgorPassword.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: UserDto): Promise<User> {
    const { email, password } = createUserDto;

    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      ...createUserDto,
      password: hashedPassword,
    });
    return await newUser.save();
  }

  async verifyEmail(req: Request, verifyUuidDto: VerifyUuidDto): Promise<any> {
    console.log(verifyUuidDto);

    //  UUID
    return { message: 'Email verified successfully' };
  }

  async login(req: Request, loginUserDto: LoginUserDto): Promise<any> {
    const { email, password } = loginUserDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const tokens = this.generateTokens(user);
    return tokens;
  }

  async refreshAccessToken(
    refreshAccessTokenDto: RefreshAccessTokenDto,
  ): Promise<any> {
    console.log(refreshAccessTokenDto);

    return { message: 'Access token refreshed' };
  }

  async forgotPassword(
    req: Request,
    createForgotPasswordDto: CreateForgotPasswordDto,
  ): Promise<any> {
    console.log(createForgotPasswordDto);

    return { message: 'Password recovery email sent' };
  }

  async forgotPasswordVerify(
    req: Request,
    verifyUuidDto: VerifyUuidDto,
  ): Promise<any> {
    console.log(verifyUuidDto);

    return { message: 'Password recovery verified' };
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<any> {
    const { email, newPassword } = resetPasswordDto;
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.password = await bcrypt.hash(newPassword, 10); // Хэшируем новый пароль
    await user.save();
    return { message: 'Password reset successfully' };
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  private generateTokens(user: UserDocument): {
    accessToken: string;
    refreshToken: string;
  } {
    const payload = { email: user.email, sub: user._id };
    const accessToken = this.jwtService.sign(payload, { expiresIn: '1h' });
    const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
    return { accessToken, refreshToken };
  }
}
