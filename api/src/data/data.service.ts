import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categories, CategoriesDocument } from '../schemas/categories.schema';
import mongoose, { Model } from 'mongoose';
import { Brands, BrandsDocument } from '../schemas/brands.schema';
import { Products, ProductsDocument } from '../schemas/products.schema';
import { BASE_URL } from '../constants';

@Injectable()
export class DataService {
  constructor(
    @InjectModel(Categories.name)
    private categoriesModel: Model<CategoriesDocument>,
    @InjectModel(Brands.name)
    private readonly brandsModel: Model<BrandsDocument>,
    @InjectModel(Products.name)
    private readonly productsModel: Model<ProductsDocument>,
  ) {
    void this.createData();
  }

  async dropCollection(db: mongoose.Connection, collectionName: string) {
    try {
      console.log('dropping db');
      await db.dropCollection(collectionName);
    } catch (e) {
      console.log(
        `Collection ${collectionName} was missing. skipping drop ...`,
      );
    }
  }

  async createData() {
    console.log('Connected db');
    await mongoose.connect(BASE_URL);
    const db = mongoose.connection;
    const collections = ['categories', 'brands', 'products'];
    for (const collectionName of collections) {
      await this.dropCollection(db, collectionName);
    }

    const [_category1, category2] = await this.categoriesModel.create([
      {
        title: 'CPU',
        image: 'fixtures/cpus.webp',
      },
      {
        title: 'GPU',
        image: 'fixtures/gpus.jpg',
      },
    ]);

    const [brand1, brand2] = await this.brandsModel.create([
      {
        name: 'nvidia',
        logo: 'fixtures/nvidiaLogo.png',
      },
      {
        name: 'amd',
        logo: 'fixtures/amdRadeonLogo.png',
      },
    ]);

    await this.productsModel.create([
      {
        category: category2._id,
        brand: brand1._id,
        name: 'Nvidia Geforce RTX 4060',
        price: 450,
        description: 'That is gpu cool!',
        image: 'fixtures/rtx4060.jpg',
      },
      {
        category: category2._id,
        brand: brand2._id,
        name: 'AMD Radeon RX 6600',
        price: 400,
        description: 'That is amd gpu cool!',
        image: 'fixtures/rx6600.jpg',
      },
    ]);

    await db.close();
  }
}
