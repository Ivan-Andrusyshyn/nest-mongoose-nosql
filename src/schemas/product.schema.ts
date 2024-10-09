import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsArray, IsNumber } from 'class-validator';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({ versionKey: false, timestamps: true })
export class Product {
  @Prop({ type: [String] })
  categories: string[];

  @Prop({ type: Number })
  weight: number;

  @Prop({
    type: {
      ua: { type: String },
      en: { type: String },
    },
  })
  title: {
    ua: string;
    en: string;
  };

  @IsNumber()
  calories: number;

  @IsArray()
  groupBloodNotAllowed: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
