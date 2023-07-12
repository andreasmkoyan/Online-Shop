import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

export type CommentDocument = HydratedDocument<Comment>;
@Schema()
export class Comment {


  @Prop()
  text: string;
  
  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'Product'})
  product: Product;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  user: User;

  
}




export const CommentSchema = SchemaFactory.createForClass(Comment);