import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UnprocessableEntityException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categories, CategoriesDocument } from '../schemas/categories.schema';
import mongoose, { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import express from 'express';
import { CreateCategoryDto } from './create-category.dto';
import { randomUUID } from 'crypto';
import { extname } from 'path';

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: Model<CategoriesDocument>,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public/uploads/images',
        filename(
          _req: express.Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const filename = randomUUID();
          callback(null, filename + '' + extname(file.originalname));
        },
      }),
    }),
  )
  async createCategories(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCategory: CreateCategoryDto,
  ) {
    try {
      const category = new this.categoriesModel({
        title: createCategory.title,
        image: file ? '/uploads/images/' + file.filename : null,
      });
      await category.save();
      return category;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(error);
      }

      throw error;
    }
  }

  @Get()
  async getCategories() {
    return this.categoriesModel.find();
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoriesModel.findByIdAndDelete(id);
  }
}
