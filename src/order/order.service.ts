import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

constructor(
@InjectModel(User.name) private userModel: Model<User>,
@InjectModel(Product.name) private productModel: Model<Product>,
@InjectModel(Order.name) private orderModel: Model<Order>,){}


 async create(createOrderDto: CreateOrderDto) {
   try{
    const user = await this.userModel.findById(createOrderDto.user)
    if(!user){
      throw new NotFoundException('user not found');
    }
    const product = await this.productModel.findById(createOrderDto.product)
    if(product){
      const order = new this.orderModel(createOrderDto)
      await order.save();
      await this.userModel.findByIdAndUpdate(user._id,{order:[...user.order,order._id]})

      return "order added"
    }
    else{
      throw new NotFoundException('product not found')
    }

   }
   catch(e){
    throw new NotFoundException('not found')
   }
  }

  findAll() {
    return this.orderModel.find().populate('user','name').populate('product');
  }

 async findOne(id: string) {
    try{
      const order = await this.orderModel.findById(id);
      if(!order){
        return 'product not found'
      }
      else{
        return (await order.populate('user','name')).populate('product')
      }
    }
    catch(e){
        throw new NotFoundException({message:e.message})
    }
    
  }

 async update(id: string, updateOrderDto: UpdateOrderDto) {
   try{
      const order = await this.orderModel.findById(id);
      if(!order){
        return 'product not found'
      }
      const user = await this.userModel.findById(order.user);
      const product = await this.productModel.findById(order.product)
      if(user && product){
        await this.orderModel.findByIdAndUpdate(id,updateOrderDto);
        return "order updated"

      }
      else{
        throw new NotFoundException ('user or product not found')
      }
  }
  catch(e){
    throw new NotFoundException({message:e.message})
  }
  }

async  remove(id: string) {
    try{
    const order = await this.orderModel.findById(id);
    if(!order){
      throw new NotFoundException('order not found');
    }
    const user = await this.userModel.findById(order.user);

    if(user){
      const product = await this.productModel.findById(order.product)
      if(product){
      const updateOrder = user.order.filter((order:any) => order._id !=id)
      await this.userModel.findByIdAndUpdate(user._id,{order:[...updateOrder]})
      await this.orderModel.findByIdAndDelete(id);
      return 'order deleted'
      }
      else{
          throw new NotFoundException('product not found')
      }
    }
    else{
      throw new NotFoundException('user not found')
    }


   }
   catch(e){
    throw new NotFoundException({message:e.message})
   }
  }
}
