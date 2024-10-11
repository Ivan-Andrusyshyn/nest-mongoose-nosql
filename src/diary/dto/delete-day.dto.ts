import { IsString, IsNotEmpty } from 'class-validator';

export class DeleteDayDto {
  @IsString()
  @IsNotEmpty()
  _id: string;
}
