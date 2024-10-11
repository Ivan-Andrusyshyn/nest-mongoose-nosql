import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/user/dto/user.dto';

export class RegisterCredentialsDto {
  @ApiProperty({
    type: UserDto,
    description: 'User details for registration',
  })
  user: UserDto;
}
