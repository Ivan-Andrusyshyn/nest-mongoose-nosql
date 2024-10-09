import {
  IsString,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { TitleDto } from './title.dto';

export class ConsumedProductDto {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ValidateNested()
  @Type(() => TitleDto)
  title: TitleDto;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  kcal: number;
}
