import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { GetAllProductsDto } from './dto/get-allProducts.dto';
import { Product } from 'src/schemas/product.schema';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all products based on search criteria' })
  @ApiQuery({
    name: 'title',
    required: false,
    description: 'Product title to search by (in Ukrainian or English)',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of products returned (default 10)',
  })
  @ApiResponse({
    status: 200,
    description: 'Products successfully retrieved',
    type: [Product],
  })
  @ApiResponse({ status: 404, description: 'No products found' })
  async getAllProducts(@Query() getAllProductsDto: GetAllProductsDto) {
    return this.productService.getAllProducts(getAllProductsDto);
  }
}
