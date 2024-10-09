import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Get,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/common/auth.guard';
import { Request, Response } from 'express';

import { DiaryService } from './diary.service';
import { CreateDiaryDto } from './dto/create-diary.dto';
import { RemoveProductDto } from './dto/remove-product.dto';
import { UserDocument } from 'src/schemas/user.schema';

@Controller('diary')
export class DiaryController {
  constructor(private readonly diaryService: DiaryService) {}

  @Post('add')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addProduct(
    @Req() req: Request,
    @Body() createDiaryDto: CreateDiaryDto,
    @Res() res: Response,
  ) {
    const userId = (req.user as UserDocument)._id.toString();

    const { date } = req.query;

    const newProduct = await this.diaryService.addProduct(
      userId,
      date as string,
      createDiaryDto,
    );
    return res.status(HttpStatus.CREATED).json({
      status: 'success',
      code: HttpStatus.CREATED,
      data: newProduct,
    });
  }

  @Get()
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async getInfoPerDate(
    @Req() req: Request,
    @Query('date') date: string,
    @Res() res: Response,
  ) {
    const userId = (req.user as UserDocument)._id;

    const diaryEntry = await this.diaryService.getInfoPerDate(userId, date);

    return res.status(HttpStatus.OK).json({
      status: 'success',
      code: HttpStatus.OK,
      data: diaryEntry,
    });
  }

  @Delete('remove')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async removeProduct(
    @Req() req: Request,
    @Query() removeProductDto: RemoveProductDto,
    @Res() res: Response,
  ) {
    const userId = (req.user as UserDocument)._id;

    const { productId, date } = removeProductDto;

    const removedProduct = await this.diaryService.removeProduct(
      userId,
      productId,
      date,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Product was deleted',
      status: 'success',
      code: HttpStatus.OK,
      data: removedProduct,
    });
  }
}
