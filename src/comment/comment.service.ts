import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentService {

  
 constructor(@InjectModel(User.name) private userModel: Model<User>,
@InjectModel(Product.name) private productModel: Model<Product>,
@InjectModel(Comment.name) private commentModel: Model<Comment>,){}
  
async  create(createCommentDto: CreateCommentDto) {
    try{
      const product = await this.productModel.findById(createCommentDto.product);
      if(!product){
        throw new NotFoundException('product not found')
      }
      const user = await this.userModel.findById(createCommentDto.user)
      if(!user){
        throw new NotFoundException('user not found')
      }
      else{
        const comment = new this.commentModel(createCommentDto);
        await comment.save();
        await this.productModel.findByIdAndUpdate(product._id,{comments:[...product.comments,product._id]})
        return 'comment added'
      }

    }
    catch(e){
      throw new NotFoundException({message:e.message})
    }
  }

  findAll() {
    return this.commentModel.find().populate('user','name').populate('product','title');
  }

async  findOne(id: string) {
   try{
      const comment = await this.commentModel.findById(id);
      if(!comment){
        return 'comment not found'
      }
      else{
        return (await comment.populate('user','name')).populate('product','title')
      }
    }
    catch(e){
        throw new NotFoundException({message:e.message})
    }
  }

 async update(id: string, updateCommentDto: UpdateCommentDto) {
    try{
      const comment = await this.commentModel.findById(id);
      if(!comment){
        return 'comment not found'
      }
      const user = await this.userModel.findById(comment.user);
      const product = await this.productModel.findById(comment.product)
      if(user && product){
        
        await this.commentModel.findByIdAndUpdate(updateCommentDto)
       
        return "product updated"

      }
      else{
        throw new NotFoundException ('user or product not found ')
      }
  }
  catch(e){
    throw new NotFoundException({message:e.message})
  }
  }

 async remove(id: string) {
  try{
    const comment = await this.commentModel.findById(id);
    if(!comment){
      throw new NotFoundException('not found');
    }
    const user = await this.userModel.findById(comment.user);
    const product = await this.productModel.findById(comment.product)
    if(user && product){
      const updateComment = product.comments.filter((comment:any) => comment._id !=id)
     
      await this.productModel.findByIdAndUpdate(product._id,{comments:[...updateComment]})
      await this.commentModel.findByIdAndDelete(id);
      return 'comment deleted'
    }
    else{
      throw new NotFoundException('user or product not found')
    }

   }
   catch(e){
    throw new NotFoundException({message:e.message})
   }
  }
}
