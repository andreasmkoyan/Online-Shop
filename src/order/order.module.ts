import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { User, UserSchema } from 'src/user/entities/user.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema },{ name: User.name, schema: UserSchema },
  
  { name: Product.name, schema: ProductSchema }])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
