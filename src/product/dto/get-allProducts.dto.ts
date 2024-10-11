import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class GetAllProductsDto {
  @ApiPropertyOptional({
    description: 'Search products by title (Ukrainian or English)',
    example: 'Apple',
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiPropertyOptional({
    description: 'Limit the number of products returned',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number;
}
