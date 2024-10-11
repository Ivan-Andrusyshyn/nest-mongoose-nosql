import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { Types } from 'mongoose';
import { DeleteDayDto } from './dto/delete-day.dto';

@ApiTags('Diary')
@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Get(':userId/:date')
  @ApiOperation({ summary: 'Get diary entry for a specific date and user' })
  @ApiParam({
    name: 'date',
    required: true,
    description: 'The date of the diary entry (example 2024-10-10)',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The ID of the user',
  })
  @ApiResponse({ status: 200, description: 'Diary entry found' })
  @ApiResponse({ status: 404, description: 'Diary entry not found' })
  async getInfoPerDate(
    @Param('userId') userId: string,
    @Param('date') date: string,
  ) {
    return await this.diaryService.getInfoPerDate(
      new Types.ObjectId(userId),
      date,
    );
  }

  @Delete('diary-day')
  async deleteDiaryDay(@Body() deleteDayDto: DeleteDayDto) {
    return await this.diaryService.deleteDiaryDay(deleteDayDto);
  }

  @ApiOperation({
    summary: 'Add a new product to the diary for a specific date and user',
  })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The ID of the user',
  })
  @ApiParam({
    name: 'date',
    required: true,
    description: 'The date of the diary entry',
  })
  @ApiBody({ type: CreateDiaryDto })
  @ApiResponse({
    status: 201,
    description: 'Product successfully added to diary',
  })
  @ApiResponse({
    status: 404,
    description: 'Diary entry not found for the user and date',
  })
  @Post(':userId/:date')
  async addProduct(
    @Param('userId') userId: string,
    @Param('date') date: string,
    @Body() createDiaryDto: CreateDiaryDto,
  ) {
    return await this.diaryService.addProduct(
      new Types.ObjectId(userId),
      date,
      createDiaryDto,
    );
  }

  @ApiOperation({ summary: 'Remove a product from the diary entry' })
  @ApiParam({
    name: 'userId',
    required: true,
    description: 'The ID of the user',
  })
  @ApiParam({
    name: 'date',
    required: true,
    description: 'The date of the diary entry (example 2024-10-10)',
  })
  @ApiParam({
    name: 'productId',
    required: true,
    description: 'The ID of the product',
  })
  @ApiResponse({
    status: 200,
    description: 'Product removed from the diary entry',
  })
  @ApiResponse({
    status: 404,
    description: 'Diary entry or product not found',
  })
  @Delete(':userId/:date/:productId')
  async removeProduct(
    @Param('userId') userId: string,
    @Param('date') date: string,
    @Param('productId') productId: string,
  ) {
    return await this.diaryService.removeProduct(
      new Types.ObjectId(userId),
      productId,
      date,
    );
  }
}
