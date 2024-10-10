import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import {
  IsArray,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export type DiaryDocument = Diary & Document;

class Title {
  @IsString()
  en: string;
}

@Schema({ versionKey: false })
export class Diary {
  @Prop({ type: String, default: () => new Date().toISOString() })
  @IsDateString()
  date: string;

  @Prop({ type: Types.ObjectId, ref: 'user', required: true })
  @IsNotEmpty()
  owner: Types.ObjectId;

  @Prop({
    type: [
      {
        _id: { type: String, required: true },
        title: {
          ua: { type: String },
          en: { type: String },
        },
        weight: { type: Number, required: true },
        kcal: { type: Number, required: true },
      },
    ],
    default: [],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ConsumedProduct)
  consumedProducts: ConsumedProduct[];

  @Prop({ type: Number, default: 0 })
  @IsNumber()
  total: number;
}

class ConsumedProduct {
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ValidateNested()
  @Type(() => Title)
  title: Title;

  @IsNumber()
  @IsNotEmpty()
  weight: number;

  @IsNumber()
  @IsNotEmpty()
  kcal: number;
}

export const DiarySchema = SchemaFactory.createForClass(Diary);
