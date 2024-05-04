import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class Categories {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  image: string;
}

export const CategoriesSchema = SchemaFactory.createForClass(Categories);
export type CategoriesDocument = Categories & Document;
