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

    const [category1, category2] = await this.categoriesModel.create([
      {
        title: 'Проссецоры',
        image: 'fixtures/cpus.webp',
      },
      {
        title: 'Видеокарты',
        image: 'fixtures/gpus.jpg',
      },
    ]);

    const [brand1, brand2, _brand3, brand4] = await this.brandsModel.create([
      {
        name: 'nvidia',
        logo: 'fixtures/nvidiaLogo.png',
      },
      {
        name: 'amd',
        logo: 'fixtures/amdRadeonLogo.png',
      },
      {
        name: 'msi',
        logo: 'fixtures/msi.jpg',
      },
      {
        name: 'intel',
        logo: 'fixtures/intel.jpg',
      },
      {
        name: 'gigabyte',
        logo: 'fixtures/gigabyte.jpg',
      },
      {
        name: 'palit',
        logo: 'fixtures/palit.svg',
      },
      {
        name: 'samsung',
        logo: 'fixtures/samsung.png',
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
        characteristics: [
          {
            title: 'Технические характеристики',
            characteristic: [
              {
                name: 'Объём памяти',
                value: '8192',
              },
            ],
          },
        ],
      },
      {
        category: category2._id,
        brand: brand1._id,
        name: 'Nvidia Geforce RTX 4060',
        price: 550,
        description: 'That is gpu cool!',
        image: 'fixtures/msinvidia4060.png',
        characteristics: [
          {
            title: 'Технические характеристики',
            characteristic: [
              {
                name: 'Объём памяти',
                value: '8192',
              },
            ],
          },
        ],
      },
      {
        category: category2._id,
        brand: brand2._id,
        name: 'AMD Radeon RX 6600',
        price: 400,
        description: 'That is amd gpu cool!',
        image: 'fixtures/rx6600.jpg',
        characteristics: [
          {
            title: 'Технические характеристики',
            characteristic: [
              {
                name: 'Объём памяти',
                value: '8192',
              },
            ],
          },
        ],
      },
      {
        category: category1._id,
        brand: brand4._id,
        name: 'Intel Core 5',
        price: 350,
        description: 'CPU desc',
        image: 'fixtures/intel5.png',
        characteristics: [
          {
            title: 'Технические характеристики',
            characteristic: [
              {
                name: 'Линейка',
                value: 'Intel Core 5',
              },
            ],
          },
        ],
      },
    ]);

    await db.close();
  }
}
