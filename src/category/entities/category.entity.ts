import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.entity';


export type CategoryDocument = HydratedDocument<Category>;
@Schema()
export class Category {


  @Prop()
  name: string;
  
  @Prop()
  picUrl: string;

  @Prop({type:mongoose.Schema.Types.ObjectId,ref:'User'})
  user: User;

  
}




export const CategorySchema = SchemaFactory.createForClass(Category);
