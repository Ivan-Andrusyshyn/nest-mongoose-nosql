import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsDefined,
  IsEmail,
} from 'class-validator';

export class ResetPasswordDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  @MaxLength(44, { message: 'Your email is too long!' })
  readonly email: string;

  @IsNotEmpty({ message: 'New password is required' })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  newPassword: string;

  @IsNotEmpty({ message: 'Confirm password is required' })
  @IsString()
  @MinLength(8)
  @MaxLength(100)
  confirmPassword: string;
}
