import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  title: string;
  
  @Prop()
  body: string;

  @Prop()
  picUrl: string[];

  @Prop()
  price: number;
  
  @Prop()
  count: number;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  user: User;

  
  @Prop(raw({
    num: { type: Number },
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User' }
  }))
  rating: Record<string, User>;                //??
  
  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Category'})
 category:Category;

 @Prop({type:[{type:mongoose.Schema.Types.ObjectId,ref:'Comment'}]})
 comments:Comment[];


}

export const ProductSchema = SchemaFactory.createForClass(Product);
