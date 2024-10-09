import {
  Controller,
  Post,
  UseGuards,
  Body,
  ValidationPipe,
} from '@nestjs/common';

import { User } from 'src/schemas/user.schema';
import { AuthGuard, AuthUser } from 'src/common';
import { UserDto } from 'src/user/dto/user.dto';
import { LoginCredentialsDto } from './dto/login-creditials.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) user: UserDto,
  ): Promise<{ user: UserDto; token: string }> {
    return this.authService.signUp(user);
  }

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto,
  ): Promise<{ token: string }> {
    return this.authService.signIn(loginCredentialsDto);
  }

  @Post('/authenticated')
  @UseGuards(AuthGuard)
  getAuthenticatedUser(@AuthUser() user: User): any {
    return this.authService.getAuthenticatedUser(user);
  }
}
