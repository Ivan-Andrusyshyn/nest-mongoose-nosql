import {
  Injectable,
  Logger,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { plainToClass, plainToInstance } from 'class-transformer';

import { User, UserDocument } from 'src/schemas/user.schema';
import { LoginCredentialsDto } from './dto/login-creditials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { UserDto } from 'src/user/dto/user.dto';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService');

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(
    registerCredentialsDto: UserDto,
  ): Promise<{ user: UserDto; token: string }> {
    const { name, email, password, userData } = registerCredentialsDto;

    const existedUser = await this.userModel.findOne({ email });
    if (existedUser) {
      throw new BadRequestException('This email is already used.');
    }

    try {
      const hashedPassword = bcrypt.hashSync(password, 10);

      const newUser = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        userData: {
          currentWeight: userData.currentWeight || null,
          height: userData.height || null,
          age: userData.age || null,
          desiredWeight: userData.desiredWeight || null,
          bloodType: userData.bloodType || null,
          dailyRate: userData.dailyRate || null,
          bannedProducts: userData.bannedProducts || [],
        },
      });
      const newUserObject = newUser.toObject();

      const payload: JwtPayload = {
        id: +newUser._id,
        email: newUser.email,
      };
      const token = this.jwtService.sign(payload);

      this.logger.log('User signed up successfully');

      return {
        user: plainToInstance(UserDto, newUserObject),
        token,
      };
    } catch (error) {
      this.logger.error(error.message, error.stack);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async signIn(
    loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ user: UserDto; token: string }> {
    const { email, password } = loginCredentialsDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) throw new BadRequestException('Invalid credentials');

    const payload: JwtPayload = { id: +user._id, email: user.email };
    const newUserObject = user.toObject();

    const token = this.jwtService.sign(payload);
    this.logger.debug(
      `Generated JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return {
      user: plainToInstance(UserDto, newUserObject),
      token,
    };
  }

  getAuthenticatedUser(user: User): UserDto {
    return plainToClass(UserDto, user);
  }
}
