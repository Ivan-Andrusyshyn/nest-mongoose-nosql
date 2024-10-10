import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';

export class UserData {
  @Prop({ type: Number, default: null })
  @IsOptional()
  @IsNumber()
  currentWeight: number;

  @Prop({ type: Number, default: null })
  @IsOptional()
  @IsNumber()
  height: number;

  @Prop({ type: Number, default: null })
  @IsOptional()
  @IsNumber()
  age: number;

  @Prop({ type: Number, default: null })
  @IsOptional()
  @IsNumber()
  desiredWeight: number;

  @Prop({ type: Number, enum: [1, 2, 3, 4], default: null })
  @IsOptional()
  @IsEnum([1, 2, 3, 4])
  bloodType: number;

  @Prop({ type: Number, default: null })
  @IsOptional()
  @IsNumber()
  dailyRate: number;

  @Prop({ type: Array, default: [] })
  @IsOptional()
  @IsArray()
  bannedProducts: string[];
}

export const UserDataSchema = SchemaFactory.createForClass(UserData);
