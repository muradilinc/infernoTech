import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriesController } from './categories/categories.controller';
import { BrandsController } from './brands/brands.controller';
import { ProductsController } from './products/products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BASE_URL } from './constants';
import { Categories, CategoriesSchema } from './schemas/categories.schema';
import { Brands, BrandsSchema } from './schemas/brands.schema';
import { Products, ProductsSchema } from './schemas/products.schema';
import { DataService } from './data/data.service';

@Module({
  imports: [
    MongooseModule.forRoot(BASE_URL),
    MongooseModule.forFeature([
      { name: Categories.name, schema: CategoriesSchema },
      { name: Brands.name, schema: BrandsSchema },
      { name: Products.name, schema: ProductsSchema },
    ]),
  ],
  controllers: [
    AppController,
    CategoriesController,
    BrandsController,
    ProductsController,
  ],
  providers: [AppService, DataService],
})
export class AppModule {}
