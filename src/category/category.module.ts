import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './entities/category.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema },
    { name: User.name, schema: UserSchema},{ name: Product.name, schema: ProductSchema }])],

  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
