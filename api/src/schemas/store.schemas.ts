import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { compare, genSalt, hash } from 'bcrypt';
import { randomUUID } from 'crypto';

export interface StoreMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

@Schema()
export class Store {
  @Prop({
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  displayName: string;

  @Prop({ required: true, enum: ['user', 'store', 'admin'], default: 'store' })
  role: string;

  @Prop()
  googleID: string;
}

export const StoreSchema = SchemaFactory.createForClass(Store);

StoreSchema.methods.generateToken = function () {
  this.token = randomUUID();
};

StoreSchema.methods.checkPassword = function (password: string) {
  return compare(password, this.password);
};

StoreSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

StoreSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    return ret;
  },
});

export type UserDocument = Store & Document & StoreMethods;
