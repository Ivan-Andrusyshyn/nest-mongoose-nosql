import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsNotEmpty } from 'class-validator';

export class ConsumedProductDto {
  @ApiProperty({ example: 'product1_id', description: 'ID of the product' })
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty({
    example: { en: 'Apple' },
    description: 'Title of the product',
  })
  title: {
    en: string;
  };

  @ApiProperty({ example: 150, description: 'Weight of the product in grams' })
  @IsNumber()
  weight: number;

  @ApiProperty({ example: 80, description: 'Kcal of the product' })
  @IsNumber()
  kcal: number;
}
