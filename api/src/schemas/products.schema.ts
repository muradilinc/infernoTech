import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Categories } from './categories.schema';
import { Brands } from './brands.schema';
import mongoose from 'mongoose';
import { Store } from './store.schemas';

@Schema()
export class Products {
  @Prop({ required: true, ref: Categories.name })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: Brands.name })
  brand: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: Store.name })
  store: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  characteristics: [
    {
      title: string;
      characteristic: [
        {
          name: string;
          value: string;
        },
      ];
    },
  ];
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
export type ProductsDocument = Products & Document;
