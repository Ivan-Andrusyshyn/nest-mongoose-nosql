import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshAccessTokenDto {
  @IsNotEmpty({ message: 'Refresh token is required' })
  @IsString()
  refreshToken: string;
}
