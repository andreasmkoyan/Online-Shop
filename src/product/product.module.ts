import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/product.entity';
import { Category, CategorySchema } from 'src/category/entities/category.entity';
import { Comment, CommentSchema } from 'src/comment/entities/comment.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema },{ name: Category.name, schema: CategorySchema },{ name: Comment.name, schema: CommentSchema },{ name: User.name, schema: UserSchema }])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
