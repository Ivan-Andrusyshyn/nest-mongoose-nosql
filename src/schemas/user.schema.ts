import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserData, UserDataSchema } from './user-data.schema';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false, collection: 'users' })
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

  @Prop({ type: UserDataSchema, default: () => ({}) })
  userData: UserData;
}

export const UserSchema = SchemaFactory.createForClass(User);
