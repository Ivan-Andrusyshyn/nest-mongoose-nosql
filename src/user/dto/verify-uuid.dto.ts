import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyUuidDto {
  @IsNotEmpty({ message: 'UUID is required' })
  @IsString()
  uuid: string;
}
