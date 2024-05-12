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
import { Products, ProductsDocument } from '../schemas/products.schema';
import mongoose, { Model } from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import express from 'express';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { CreateProductsDto } from './create-products.dto';

@Controller('products')
export class ProductsController {
  constructor(
    @InjectModel(Products.name)
    private productsModel: Model<ProductsDocument>,
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
  async createProduct(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProduct: CreateProductsDto,
  ) {
    try {
      const product = new this.productsModel({
        category: createProduct.category,
        brand: createProduct.brand,
        name: createProduct.name,
        price: parseInt(createProduct.price),
        description: createProduct.description,
        image: file ? '/uploads/images/' + file.filename : null,
        characteristics: JSON.parse(createProduct.characteristics),
      });
      await product.save();
      return product;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(error);
      }

      throw error;
    }
  }

  @Get()
  getAll() {
    return this.productsModel.find().populate('brand category');
  }

  @Get(':id')
  async getProductByFilter(@Param('id') id: string) {
    const categories = await this.productsModel.find({ category: id });
    const brands = await this.productsModel.find({ brand: id });
    if (categories.length !== 0) {
      return categories;
    }
    if (brands.length !== 0) {
      return brands;
    }
    if (categories.length === 0 && brands.length === 0) {
      return this.productsModel.findById(id);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsModel.findByIdAndDelete(id);
  }
}
