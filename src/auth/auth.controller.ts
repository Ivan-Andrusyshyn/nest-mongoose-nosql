import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UserDto } from 'src/user/dto/user.dto';
import { LoginCredentialsDto } from './dto/login-creditials.dto';

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'User successfully registered',
    type: UserDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data or user already exists',
  })
  @ApiBody({ description: 'User data for registration', type: UserDto })
  async signUp(@Body() registerCredentialsDto: UserDto) {
    return this.authService.signUp(registerCredentialsDto);
  }

  @Post('signin')
  @HttpCode(200)
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'User successfully logged in',
    type: UserDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid login credentials' })
  @ApiBody({ description: 'Login credentials', type: LoginCredentialsDto })
  async signIn(@Body() loginCredentialsDto: LoginCredentialsDto) {
    return this.authService.signIn(loginCredentialsDto);
  }
}
