import { Controller, Get, Param } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Store, StoreDocument } from '../schemas/store.schemas';
import { Model } from 'mongoose';

@Controller('stores')
export class StoresController {
  constructor(
    @InjectModel(Store.name) private storesModel: Model<StoreDocument>,
  ) {}

  @Get(':id')
  getStore(@Param('id') id: string) {
    return this.storesModel.findById(id).select('-token -role');
  }
}
