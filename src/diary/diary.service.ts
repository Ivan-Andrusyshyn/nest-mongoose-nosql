import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Diary, DiaryDocument } from 'src/schemas/diary.schema';
import { ConsumedProductDto } from './dto/consumed-product.dto';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { DeleteDayDto } from './dto/delete-day.dto';

@Injectable()
export class DiaryService {
  constructor(
    @InjectModel(Diary.name) private readonly diaryModel: Model<DiaryDocument>,
  ) {}

  async findDiaryEntry(
    date: string,
    userId: Types.ObjectId,
  ): Promise<DiaryDocument> {
    const diaryEntry = await this.diaryModel
      .findOne({ date, owner: userId })
      .exec();
    if (!diaryEntry) {
      throw new NotFoundException(
        `Diary entry not found for userId: ${userId} on date: ${date}`,
      );
    }
    return diaryEntry;
  }
  async deleteDiaryDay(deleteDayDto: DeleteDayDto) {
    const { _id } = deleteDayDto;
    const objectId = Types.ObjectId.isValid(_id)
      ? new Types.ObjectId(_id)
      : null;

    const result = await this.diaryModel.deleteOne({ _id: objectId });
    console.log(result);

    if (result.deletedCount > 0) {
      return { message: 'Diary entry successfully deleted.' };
    } else {
      throw new NotFoundException('Diary entry not found or already deleted.');
    }
  }

  async addProduct(
    userId: Types.ObjectId,
    date: string,
    createDiaryDto: CreateDiaryDto,
  ): Promise<DiaryDocument> {
    if (!userId) {
      throw new BadRequestException('Invalid userId provided.');
    }

    const diaryEntry = await this.findDiaryEntry(date, userId).catch(
      async () => {
        return this.createNewDiaryEntry(userId, date);
      },
    );

    const { consumedProducts } = createDiaryDto;
    this.updateDiaryEntry(diaryEntry, consumedProducts);

    return await diaryEntry.save();
  }

  private updateDiaryEntry(
    diaryEntry: DiaryDocument,
    consumedProducts: ConsumedProductDto[],
  ) {
    consumedProducts.forEach((product) => {
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
  }

  async getInfoPerDate(
    userId: Types.ObjectId,
    date: string,
  ): Promise<DiaryDocument> {
    return this.findDiaryEntry(date, userId);
  }

  private async createNewDiaryEntry(
    userId: Types.ObjectId,
    date: string,
  ): Promise<DiaryDocument> {
    const newDiaryEntry = new this.diaryModel({
      date,
      owner: userId,
      consumedProducts: [],
      total: 0,
    });

    return await newDiaryEntry.save();
  }

  async removeProduct(
    userId: Types.ObjectId,
    productId: string,
    date: string,
  ): Promise<any> {
    const diaryEntry = await this.findDiaryEntry(date, userId);

    const productIndex = diaryEntry.consumedProducts.findIndex(
      (p) => p._id === productId,
    );
    if (productIndex === -1) {
      throw new NotFoundException('Product not found in diary');
    }

    const [removedProduct] = diaryEntry.consumedProducts.splice(
      productIndex,
      1,
    );
    diaryEntry.total -= removedProduct.kcal;

    await diaryEntry.save();
    return removedProduct;
  }
}
