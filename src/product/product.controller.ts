import { Controller, Get, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from 'src/schemas/product.schema';
import { GetAllProductsDto } from './dto/get-allProducts.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllProducts(
    @Query() query: GetAllProductsDto,
  ): Promise<{ status: string; code: number; data: Product[] }> {
    const products = await this.productService.getAllProducts(query);

    return {
      status: 'success',
      code: HttpStatus.OK,
      data: products,
    };
  }
}
