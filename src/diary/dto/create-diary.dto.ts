import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConsumedProductDto } from './consumed-product.dto';

export class CreateDiaryDto {
  @IsString()
  @IsNotEmpty()
  date: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsumedProductDto)
  consumedProducts: ConsumedProductDto[];

  @IsNumber()
  @IsNotEmpty()
  total: number;
}
