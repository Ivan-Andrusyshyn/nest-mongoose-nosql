import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';

import { Response } from 'express';
import { AuthGuard } from 'src/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { VerifyUuidDto } from './dto/verify-uuid.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { RefreshAccessTokenDto } from './dto/refresh-accessToken.dto';
import { CreateForgotPasswordDto } from './dto/create-forgorPassword.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() createUserDto: UserDto, @Res() res: Response) {
    const user = await this.userService.create(createUserDto);
    return res
      .status(HttpStatus.CREATED)
      .json({ message: 'User created successfully', user });
  }

  @Post('verify-email')
  @HttpCode(HttpStatus.OK)
  async verifyEmail(@Req() req: Request, @Body() verifyUuidDto: VerifyUuidDto) {
    await this.userService.verifyEmail(req, verifyUuidDto);
    return { message: 'Email verified successfully' };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Req() req: Request,
    @Body() loginUserDto: LoginUserDto,
    @Res() res: Response,
  ) {
    const tokens = await this.userService.login(req, loginUserDto);
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Login successful', tokens });
  }

  @Post('refresh-access-token')
  @HttpCode(HttpStatus.OK)
  async refreshAccessToken(
    @Body() refreshAccessTokenDto: RefreshAccessTokenDto,
    @Res() res: Response,
  ) {
    const newTokens = await this.userService.refreshAccessToken(
      refreshAccessTokenDto,
    );
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Tokens refreshed successfully', newTokens });
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  async forgotPassword(
    @Req() req: Request,
    @Body() createForgotPasswordDto: CreateForgotPasswordDto,
  ) {
    await this.userService.forgotPassword(req, createForgotPasswordDto);
    return { message: 'Password reset email sent successfully' };
  }

  @Post('forgot-password-verify')
  @HttpCode(HttpStatus.OK)
  async forgotPasswordVerify(
    @Req() req: Request,
    @Body() verifyUuidDto: VerifyUuidDto,
  ) {
    await this.userService.forgotPasswordVerify(req, verifyUuidDto);
    return { message: 'Password reset verification successful' };
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    await this.userService.resetPassword(resetPasswordDto);
    return { message: 'Password reset successfully' };
  }

  @Get('data')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const users = await this.userService.findAll();
    return users;
  }
}
