import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsOptional,
} from 'class-validator';
import { UserDataDto } from './user-data.dto';

export class UserDto {
  @ApiProperty({
    example: 'example@example.com',
    description: 'Email address of the user',
    minLength: 3,
    maxLength: 254,
  })
  @IsEmail({}, { message: 'Invalid email format' })
  @MinLength(3)
  @MaxLength(254)
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Password for the user account',
    minLength: 8,
    maxLength: 100,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'Full name of the user',
    minLength: 3,
    maxLength: 254,
  })
  @IsString()
  @MinLength(3)
  @MaxLength(254)
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @ApiProperty({
    type: UserDataDto,
    description: 'Optional user data such as current weight, height, etc.',
    required: false,
  })
  @IsOptional()
  userData?: UserDataDto;
}
