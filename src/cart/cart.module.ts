import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './entities/cart.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema },{ name: User.name, schema: UserSchema },{ name: Product.name, schema: ProductSchema }])],

  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
