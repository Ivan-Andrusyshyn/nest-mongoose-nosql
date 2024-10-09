import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from 'src/schemas/product.schema';
import { GetAllProductsDto } from './dto/get-allProducts.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async getAllProducts(
    getAllProductsDto: GetAllProductsDto,
  ): Promise<Product[]> {
    const { title, limit = 10 } = getAllProductsDto;

    const titleFromUrl = title ? decodeURI(title).trim() : '';

    const query = titleFromUrl
      ? {
          $or: [
            { 'title.ua': { $regex: titleFromUrl, $options: 'i' } },
            { 'title.en': { $regex: titleFromUrl, $options: 'i' } },
          ],
        }
      : {};

    const products = await this.productModel.find(query).limit(limit).exec();

    if (!products || products.length === 0) {
      throw new NotFoundException(`${titleFromUrl || 'Products'} not found`);
    }

    return products;
  }
}
