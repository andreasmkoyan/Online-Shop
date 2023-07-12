import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';


export type CartDocument = HydratedDocument<Cart>;
@Schema()
export class Cart {


  @Prop()
  quantity: string;
  
  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Product'})
  product: Product;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  user: User;

  
}




export const CartSchema = SchemaFactory.createForClass(Cart);
