import { IsString, IsOptional, IsNumber, IsArray } from 'class-validator';

export class GetAllProductsDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsNumber()
  @IsOptional()
  limit?: number;
}

export class ProductDto {
  @IsArray()
  categories: string[];

  @IsNumber()
  weight: number;

  @IsString()
  title: {
    ua: string;
    en: string;
  };

  @IsNumber()
  calories: number;

  @IsArray()
  groupBloodNotAllowed: string[];
}
