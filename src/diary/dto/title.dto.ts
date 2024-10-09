import { IsString } from 'class-validator';

export class TitleDto {
  @IsString()
  en: string;
}
