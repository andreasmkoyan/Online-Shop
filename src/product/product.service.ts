import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class ProductService {

constructor(@InjectModel(User.name) private userModel: Model<User>,
@InjectModel(Product.name) private productModel: Model<Product>,
@InjectModel(Comment.name) private commentModel: Model<Comment>,
@InjectModel(Category.name) private categoryModel: Model<Category>,

){}

 async create(createProductDto: CreateProductDto) {
  try{
    const user = await this.userModel.findById(createProductDto.user);
    const category = await this.categoryModel.findById(createProductDto.category);
    if(!user || !category){
      return "incorrect datas"
    }
    else{
     const product = new this.productModel(createProductDto);
     await product.save()
     await this.userModel.findByIdAndUpdate(user._id,{products:[...user.products,product._id]})
     return "product created"
    }


  }
  catch(e){
    throw new NotFoundException({message:e.message})
  }
    
  }

   findAll() {
    
    return this.productModel.find().populate('user','name').populate('comments.text');
     
  }

  async findOne(id: string) {
    try{
      const product = await this.productModel.findById(id);
      if(!product){
        return 'product not found'
      }
      else{
        return product.populate('user')
      }
    }
    catch(e){
        throw new NotFoundException({message:e.message})
    }
    
  }

 async update(id: string, updateProductDto: UpdateProductDto) {
  try{
      const product = await this.productModel.findById(id);
      if(!product){
        return 'product not found'
      }
      const user = await this.userModel.findById(product.user);
      if(user){
        await this.productModel.findByIdAndUpdate(id,updateProductDto);
        return "product updated"

      }
      else{
        throw new NotFoundException ('user not found')
      }
  }
  catch(e){
    throw new NotFoundException({message:e.message})
  }
    
  }

 async remove(id: string) {
   try{
    const product = await this.productModel.findById(id);
    if(!product){
      throw new NotFoundException('not found');
    }
    const user = await this.userModel.findById(product.user);
    if(user){
      const updateProduct = user.products.filter((product:any) => product._id !=id)
      await this.userModel.findByIdAndUpdate(user._id,{products:[...updateProduct]})
      await this.commentModel.deleteMany(product._id)
      await this.productModel.findByIdAndDelete(id);
      return 'product deleted'
    }


   }
   catch(e){
    throw new NotFoundException({message:e.message})
   }
  }
}
