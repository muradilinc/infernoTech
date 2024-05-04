import { Prop, SchemaFactory } from '@nestjs/mongoose';

export class Brands {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  logo: string;
}

export const BrandsSchema = SchemaFactory.createForClass(Brands);
export type BrandsDocument = Brands & Document;
