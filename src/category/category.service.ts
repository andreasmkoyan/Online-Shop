import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CategoryService {

constructor(@InjectModel(User.name) private userModel: Model<User>,
@InjectModel(Category.name) private categoryModel: Model<Category>,
@InjectModel(Product.name) private productModel: Model<Product>
){}


async  create(createCategoryDto: CreateCategoryDto) {
  try{
    const user = await this.userModel.findById(createCategoryDto.user)
    if(!user){
      return 'user not found'
    }
    else{
      const category = new this.categoryModel(createCategoryDto);
      await category.save();
      await this.userModel.findByIdAndUpdate(user._id,{categories:[...user.categories,category._id]})
      return 'category created'
    }

  }
  catch(e){
    throw new NotFoundException({message:e.message})
  }

    
  }

  findAll() {
    return this.categoryModel.find().populate('user','name');
  }

 async findOne(id: string) {
    try{
      const category = await this.categoryModel.findById(id);
      if(!category){
        return "not found"
      }
      else{
        return category.populate('user','name');
      }

    }
    catch(e){
      throw new NotFoundException({message:e.message})
    }
  }

 async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try{
      const category = await this.categoryModel.findById(id);
      if(!category){
        return "not found category"
      }
      else {
        const user = await this.userModel.findById(category.user);
        if(!user){
          return "not found user"
        }
        else{
          await this.categoryModel.findByIdAndUpdate(id,updateCategoryDto);
          return 'category updated' 

        }
      }
    }

    
    catch(e){
      throw new NotFoundException({message:e.message})
    }
    
  }

 async remove(id: string) {
    try{
      const category = await this.categoryModel.findById(id);
      if(!category){
        return "not found category"
      }
      const user = await this.userModel.findById(category.user)
      const product = await this.productModel.findById(category._id)
      if(product){
        await this.productModel.deleteMany(product._id)
      }
      else{
        return 'product not found'
      }
     
        if(user){
          let updateCategory = user.categories.filter((category:any) =>category._id !=id)
             
          console.log(updateCategory)
          await this.userModel.findByIdAndUpdate(user._id,{categiries:[...updateCategory]})
          await this.categoryModel.findByIdAndDelete(id);
          await this.productModel.deleteMany(category._id)

          console.log(user.categories)  ///???
          return 'category deleted' 

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
