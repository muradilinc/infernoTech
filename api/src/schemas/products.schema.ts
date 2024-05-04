import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Categories } from './categories.schema';
import { Brands } from './brands.schema';
import mongoose from 'mongoose';

@Schema()
export class Products {
  @Prop({ required: true, ref: Categories.name })
  category: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true, ref: Brands.name })
  brand: mongoose.Schema.Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;
}

export const ProductsSchema = SchemaFactory.createForClass(Products);
export type ProductsDocument = Categories & Document;
