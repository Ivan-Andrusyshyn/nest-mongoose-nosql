import { IsOptional, IsNumber, IsArray } from 'class-validator';

export class UserDataDto {
  @IsOptional()
  @IsNumber()
  currentWeight?: number;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  age?: number;

  @IsOptional()
  @IsNumber()
  desiredWeight?: number;

  @IsOptional()
  @IsNumber()
  bloodType?: number;

  @IsOptional()
  @IsNumber()
  dailyRate?: number;

  @IsOptional()
  @IsArray()
  bannedProducts?: string[];
}
