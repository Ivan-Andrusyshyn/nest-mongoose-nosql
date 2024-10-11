import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ValidateNested } from 'class-validator';
import { ConsumedProductDto } from './consumed-product.dto';
import { Type } from 'class-transformer';
import { Types } from 'mongoose';

export class CreateDiaryDto {
  @ApiProperty({
    example: '2024-10-10',
    description: 'Date of the diary entry',
  })
  @IsString()
  date: string;
  owner: Types.ObjectId;
  @ApiProperty({
    type: [ConsumedProductDto],
    description: 'List of consumed products',
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsumedProductDto)
  consumedProducts: ConsumedProductDto[];

  @ApiProperty({ example: 410, description: 'Total kcal for the day' })
  @IsNumber()
  total: number;
}
