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
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import express from 'express';
import { randomUUID } from 'crypto';
import { extname } from 'path';
import { CreateBrandDto } from './create-brand.dto';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Brands, BrandsDocument } from '../schemas/brands.schema';
import { Categories, CategoriesDocument } from '../schemas/categories.schema';
import { Products, ProductsDocument } from '../schemas/products.schema';

@Controller('brands')
export class BrandsController {
  constructor(
    @InjectModel(Brands.name)
    private brandsModel: Model<BrandsDocument>,
    @InjectModel(Categories.name)
    private categoriesModel: Model<CategoriesDocument>,
    @InjectModel(Products.name)
    private productsModel: Model<ProductsDocument>,
  ) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('logo', {
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
  async createBrands(
    @UploadedFile() file: Express.Multer.File,
    @Body() createBrand: CreateBrandDto,
  ) {
    try {
      const brand = new this.brandsModel({
        name: createBrand.name,
        logo: file ? '/uploads/images/' + file.filename : null,
      });
      await brand.save();
      return brand;
    } catch (error) {
      if (error instanceof mongoose.Error.ValidationError) {
        throw new UnprocessableEntityException(error);
      }

      throw error;
    }
  }

  @Get()
  getBrands() {
    return this.brandsModel.find();
  }

  @Get(':id')
  async getSingleBrands(@Param('id') id: string) {
    const brand = await this.brandsModel.findById(id);
    const productCategory = await this.productsModel.find({ brand: id });
    const categoryIds = productCategory.map((product) => product.category);
    const categories = await this.categoriesModel.find({
      _id: { $in: categoryIds },
    });

    return { ...brand?.toObject(), categories };
  }

  @Delete(':id')
  deleteBrand(@Param('id') id: string) {
    return this.brandsModel.findByIdAndDelete(id);
  }
}
