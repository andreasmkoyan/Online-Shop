import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {

constructor(
@InjectModel(User.name) private userModel: Model<User>,
@InjectModel(Product.name) private productModel: Model<Product>,
@InjectModel(Cart.name) private cartModel: Model<Cart>,){}



async  create(createCartDto: CreateCartDto) {
   try{
    const user = await this.userModel.findById(createCartDto.user)
    if(!user){
      throw new NotFoundException('user not found');
    }
    const product = await this.productModel.findById(createCartDto.product)
    if(product){
      const cart = new this.cartModel(createCartDto)
      await cart.save();
      await this.userModel.findByIdAndUpdate(user._id,{carts:[...user.carts,cart._id]})

      return "cart added"
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
    return this.cartModel.find().populate('user').populate('product');
  }

async  findOne(id: string) {
     try{
      const cart = await this.cartModel.findById(id);
      if(!cart){
        return 'product not found'
      }
      else{
        return (await cart.populate('user','name')).populate('product')
      }
    }
    catch(e){
        throw new NotFoundException({message:e.message})
    }
  }

async  update(id: string, updateCartDto: UpdateCartDto) {
    try{
      const cart = await this.cartModel.findById(id);
      if(!cart){
        return 'product not found'
      }
      const user = await this.userModel.findById(cart.user);
      
      if(user){
        const product = await this.productModel.findById(cart.product)
        if(product){
        await this.cartModel.findByIdAndUpdate(id,updateCartDto);
        return "cart updated"
        }
        else{
          throw new NotFoundException('product not found')
        }

      }
      else{
        throw new NotFoundException ('user not found')
      }
    

      }
    catch(e){
    throw new NotFoundException({message:e.message})
  }
  }

async  remove(id: string) {
    try{
    const cart = await this.cartModel.findById(id);
    if(!cart){
      throw new NotFoundException('order not found');
    }
    const user = await this.userModel.findById(cart.user);

    if(user){
      const product = await this.productModel.findById(cart.product)
      if(product){
      const updateCart = user.carts.filter((cart:any) => cart._id !=id)
      await this.userModel.findByIdAndUpdate(user._id,{carts:[...updateCart]})
      await this.cartModel.findByIdAndDelete(id);
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
