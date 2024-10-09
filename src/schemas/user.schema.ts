import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({
    required: [true, 'Password is required'],
    minlength: 8,
    maxlength: 112,
  })
  password: string;

  @Prop({
    required: [true, 'Email is required'],
    unique: true,
    minlength: 3,
    maxlength: 254,
  })
  email: string;

  @Prop({
    required: [true, 'Name is required'],
    minlength: 3,
    maxlength: 254,
  })
  name: string;

  @Prop({ default: null })
  token: string;

  @Prop({
    type: {
      currentWeight: { type: Number, default: null },
      height: { type: Number, default: null },
      age: { type: Number, default: null },
      desiredWeight: { type: Number, default: null },
      bloodType: { type: Number, enum: [1, 2, 3, 4], default: null },
      dailyRate: { type: Number, default: null },
      bannedProducts: { type: Array, default: [] },
    },
  })
  userData: {
    currentWeight: number;
    height: number;
    age: number;
    desiredWeight: number;
    bloodType: number;
    dailyRate: number;
    bannedProducts: string[];
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
