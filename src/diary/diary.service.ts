import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Diary, DiaryDocument } from 'src/schemas/diary.schema';
import { Types } from 'mongoose';
import { ConsumedProductDto } from './dto/consumed-product.dto';
import { CreateDiaryDto } from './dto/create-diary.dto';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name) private readonly diaryModel: Model<DiaryDocument>,
  ) {}

  async findProductByDateAndUser(date: string, userId: Types.ObjectId) {
    return this.diaryModel.findOne({ date, owner: userId }).exec();
  }

  async findProductById(id: string) {
    const product = { _id: id, title: { en: 'Sample Product' }, kcal: 100 };
    return product;
  }

  async addProduct(
    userId: string,
    date: string,
    createDiaryDto: CreateDiaryDto,
  ): Promise<DiaryDocument> {
    const { consumedProducts } = createDiaryDto;
    if (!userId) {
      throw new NotFoundException('Please check userId!');
    }
    const diaryEntry = await this.createNewDate(userId, date);

    consumedProducts.forEach((product: ConsumedProductDto) => {
      const existingProduct = diaryEntry.consumedProducts.find(
        (p) => p._id === product._id,
      );

      if (existingProduct) {
        existingProduct.weight += product.weight;
        existingProduct.kcal += product.kcal;
      } else {
        diaryEntry.consumedProducts.push(product);
      }
    });
    diaryEntry.total += consumedProducts.reduce(
      (sum, product) => sum + product.kcal,
      0,
    );

    return await diaryEntry.save();
  }

  async getInfoPerDate(userId: any, date: string) {
    let diaryEntry = await this.findProductByDateAndUser(date, userId);

    if (!diaryEntry) {
      diaryEntry = await this.createNewDate(userId, date);
    }

    return diaryEntry;
  }

  async createNewDate(userId: any, date: string) {
    const newDiaryEntry = new this.diaryModel({
      date,
      owner: userId,
      consumedProducts: [],
      total: 0,
    });

    await newDiaryEntry.save();
    return newDiaryEntry;
  }

  async removeProduct(userId: any, productId: string, date: string) {
    const diaryEntry = await this.findProductByDateAndUser(date, userId);

    if (!diaryEntry) {
      throw new NotFoundException('Diary entry not found');
    }

    const product = diaryEntry.consumedProducts.find(
      (p) => p._id === productId,
    );

    if (!product) {
      throw new NotFoundException('Product not found in diary');
    }

    diaryEntry.consumedProducts = diaryEntry.consumedProducts.filter(
      (p) => p._id !== productId,
    );
    diaryEntry.total -= product.kcal;

    await diaryEntry.save();

    return product;
  }
}
