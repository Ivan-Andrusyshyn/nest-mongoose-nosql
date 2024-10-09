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
  @IsEmail({}, { message: 'Invalid email format' })
  @MinLength(3)
  @MaxLength(254)
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(100)
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @IsString()
  @MinLength(3)
  @MaxLength(254)
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsOptional()
  userData?: UserDataDto;
}
