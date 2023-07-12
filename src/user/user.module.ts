import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { Order, OrderSchema } from 'src/order/entities/order.entity';
import { Cart, CartSchema } from 'src/cart/entities/cart.entity';
import { Comment, CommentSchema } from 'src/comment/entities/comment.entity';
import { Category, CategorySchema } from 'src/category/entities/category.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema },{ name: Category.name, schema: CategorySchema},{ name: Product.name, schema: ProductSchema },{ name: Order.name, schema: OrderSchema },{ name: Cart.name, schema: CartSchema },{ name: Comment.name, schema: CommentSchema }])],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
