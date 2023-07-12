import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdatePasswordDto, UpdateWishDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import { Model, Query } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { Product } from 'src/product/entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { Category } from 'src/category/entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { MailerService } from '@nestjs-modules/mailer';
import * as crypto from 'crypto'



@Injectable()
export class UserService {

  constructor(@InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(Cart.name) private cartModel: Model<Cart>,
    @InjectModel(Order.name) private orderModel: Model<Order>,
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    private mailerService: MailerService,) { }



  async create(createUserDto: CreateUserDto) {
    try {
      const data = await this.userModel.findOne({
        $or: [{
          username: createUserDto.username,
          email: createUserDto.email
        }]
      })
      console.log(data)
      if (!data) {
        if (createUserDto.roles.length > 2 || createUserDto.roles.length === 0) {
          throw new BadRequestException('roles error')
        }
        else if (!createUserDto.roles.every(e => e == 'user' || e === 'manager')) {
          throw new BadRequestException('incorrect roles')
        }
        const hash = bcrypt.hashSync(createUserDto.password, 10);
        const token = crypto.randomUUID()
        const us = new this.userModel({ ...createUserDto, password: hash, emailToken: token, verify: 0 });
        this
          .mailerService
          .sendMail({
            to: createUserDto.email, // List of receivers email address
            from: 'andreasmkoyanreact@gmail.com', // Senders email address
            subject: 'Testing Nest MailerModule ✔', // Subject line
            text: 'welcome', // plaintext body
            html: `<div><h1>hello my dear ${createUserDto.name} </h1>
              <a href="http://localhost:3000/user/email/verify?email=${createUserDto.email}&emailToken=${token}"> verify </a></div>`
            // HTML body content
          }).then((success) => {
            console.log(success)
          })
          .catch((err) => {
            console.log(err)
          });
        return us.save()
      }

      else {
        return 'email or username has already exist'
      }
    }
    catch (e) {
      throw new NotFoundException({ mess: e.message })
    }
  }
  async findOneByEmailOrUsername(usernameOrEmail: string) {
    return this.userModel.findOne({
      $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });
  }


  findAll() {
    return this.userModel.find().populate('products').populate('categories');
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return "user not found"
      }
      else {
        return user
      }
    }
    catch (e) {
      throw new NotFoundException({ mess: e.message })
    }

  }

  ///// UploadImege
  async uploadProfileImage(file, id) {
    try {
      const user = await this.userModel.findById(id);
      if (user) {

        await this.userModel.findByIdAndUpdate(user._id, { picUrl: file.filename })

      }


    }
    catch (e) {
      throw new NotFoundException({ message: e.message })
    }

  }



  async addToWishList(updateWishDto: UpdateWishDto) {
    try {
      const user = await this.userModel.findById(updateWishDto.userid);
      if (!user) {
        return "user not found"
      }
      const product = await this.productModel.findById(updateWishDto.productid);
      console.log(user.wishs.some(() => this.productModel.findById(updateWishDto.productid)))

      if (product) {
        if (!user.wishs.some(() => this.productModel.findById(updateWishDto.productid))) {
          await this.userModel.findByIdAndUpdate(user._id, { wishs: [...user.wishs, product._id] })
          return "product added to wishlist"
        }
        else {
          return "product exist"
        }

      }
      else {
        return "product not found"
      }

    }
    catch (e) {
      throw new NotFoundException({ mess: e.message })
    }


  }

  async getUserWishList(id) {
    try {
      const user = await this.userModel.findById(id)

      if (!user) {
        return "user not found"
      }
      let products = [];
      for (let el of user.wishs) {
        const p = await this.productModel.findById(el)
        products.push(p)

      }


      return products

    }
    catch (e) {
      throw new NotFoundException({ mess: e.message })
    }
  }


  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return 'user not found'
      }
      else {
        await this.userModel.findByIdAndUpdate(id, { name: updateUserDto.name, surname: updateUserDto.surname, age: updateUserDto.age });
        return 'user updated'
      }

    }
    catch (e) {
      throw new NotFoundException({ message: e.message })
    }

  }

  async updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    try {
      const user = await this.userModel.findById(id)
      if (!user) {
        throw new NotFoundException('user not found')
      }
      if (bcrypt.compareSync(updatePasswordDto.oldpassword, user.password)) {
        if ((updatePasswordDto.newpassword === updatePasswordDto.confpassword)) {
          const hash = bcrypt.hashSync(updatePasswordDto.newpassword, 10);
          await this.userModel.findByIdAndUpdate(user._id, { password: hash })
          return "password was successfully updated"
        }
        else {
          return 'incorrect conf. password'
        }
      }
      else {
        return "incorrect password"
      }


    }
    catch (e) {
      throw new NotFoundException({ message: e.message })
    }






  }






  async remove(id: string) {
    try {
      const user = await this.userModel.findById(id)
      if (!user) {
        return 'user not found'
      }
      else {
        await this.productModel.deleteMany({ user: user._id });
        await this.orderModel.deleteMany({ user: user._id });
        await this.commentModel.deleteMany({ user: user._id });
        await this.categoryModel.deleteMany({ user: user._id });
        await this.cartModel.deleteMany({ user: user._id });
        await this.userModel.findByIdAndDelete(id)

        return "user deleted"
      }
    }
    catch (e) {
      throw new NotFoundException({ message: e.message })
    }
  }

  async verifyEmail(email: string, emailToken: string) {                        /// email:string,emailToken:string
    try {
      console.log(email)
      const user = await this.userModel.findOne({ email, emailToken })

      if (user) {
        await this.userModel.findByIdAndUpdate(user._id, { verify: 1, emailToken: null })
        return "user was successfully  verified"
      }
      else {
        return 'user not found'
      }
    }
    catch (e) {
      return ('oops')
    }
  }

}
