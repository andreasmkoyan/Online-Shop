
import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose, { HydratedDocument } from 'mongoose';
import { Cart } from 'src/cart/entities/cart.entity';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Role } from '../role/enum.role';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;
  
  @Prop()
  surname: string;

  @Prop()
  age: number;

  @Prop()
  email: string;
  
  @Prop()
  username: string;

  @Prop({default:'user.png'})
  picUrl: string;
  
  @Prop()
  password: string;

  @Prop()
  roles: Role[]

  @Prop()
  emailToken:string

  @Prop()
  verify:number

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]})
  products: Product[];

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Category'}]})
  categories: Category[]

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}]})
  wishs: Product[]

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Cart'}]})
  carts: Cart[];

  @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Order'}]})
  order: Order[];

}

export const UserSchema = SchemaFactory.createForClass(User);
