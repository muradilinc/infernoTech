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
import { CommandModule } from 'nestjs-command';
import { SeedCommandService } from './seed/seed.service';
import { FixturesService } from './seed/fixtures.service';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forRoot(BASE_URL),
    MongooseModule.forFeature([
      { name: Brands.name, schema: BrandsSchema },
      { name: Categories.name, schema: CategoriesSchema },
      { name: Products.name, schema: ProductsSchema },
    ]),
  ],
  controllers: [
    AppController,
    CategoriesController,
    BrandsController,
    ProductsController,
  ],
  providers: [AppService, SeedCommandService, FixturesService],
})
export class AppModule {}
