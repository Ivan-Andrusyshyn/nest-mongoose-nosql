import { IsString, IsNotEmpty } from 'class-validator';

export class RemoveProductDto {
  @IsString()
  @IsNotEmpty()
  productId: string;

  @IsString()
  @IsNotEmpty()
  date: string;
}
