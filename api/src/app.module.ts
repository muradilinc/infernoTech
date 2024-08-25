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
import { UsersController } from './users/users.controller';
import { User, UserSchema } from './schemas/users.schema';
import { Store, StoreSchema } from './schemas/store.schemas';
import { AuthService } from './auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './auth/local.strategy';
import { TokenAuthGuard } from './auth/token-auth.guard';
import { StoresController } from './stores/stores.controller';

@Module({
  imports: [
    CommandModule,
    MongooseModule.forRoot(BASE_URL),
    MongooseModule.forFeature([
      { name: Brands.name, schema: BrandsSchema },
      { name: Categories.name, schema: CategoriesSchema },
      { name: Products.name, schema: ProductsSchema },
      { name: User.name, schema: UserSchema },
      { name: Store.name, schema: StoreSchema },
    ]),
    PassportModule,
  ],
  controllers: [
    AppController,
    CategoriesController,
    BrandsController,
    ProductsController,
    UsersController,
    StoresController,
  ],
  providers: [
    AppService,
    SeedCommandService,
    FixturesService,
    AuthService,
    LocalStrategy,
    TokenAuthGuard,
  ],
})
export class AppModule {}
