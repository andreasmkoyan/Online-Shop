/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdatePasswordDto, UpdateWishDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Model, Query } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Cart } from 'src/cart/entities/cart.entity';
import { Order } from 'src/order/entities/order.entity';
import { Category } from 'src/category/entities/category.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { MailerService } from '@nestjs-modules/mailer';
export declare class UserService {
    private userModel;
    private productModel;
    private cartModel;
    private orderModel;
    private categoryModel;
    private commentModel;
    private mailerService;
    constructor(userModel: Model<User>, productModel: Model<Product>, cartModel: Model<Cart>, orderModel: Model<Order>, categoryModel: Model<Category>, commentModel: Model<Comment>, mailerService: MailerService);
    create(createUserDto: CreateUserDto): Promise<(import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>) | "email or username has already exist">;
    findOneByEmailOrUsername(usernameOrEmail: string): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>>;
    findAll(): Query<Omit<Omit<import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[], import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, User, "find">;
    findOne(id: string): Promise<(import("mongoose").Document<unknown, {}, User> & Omit<User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>) | "user not found">;
    uploadProfileImage(file: any, id: any): Promise<void>;
    addToWishList(updateWishDto: UpdateWishDto): Promise<"user not found" | "product added to wishlist" | "product exist" | "product not found">;
    getUserWishList(id: any): Promise<any[] | "user not found">;
    update(id: string, updateUserDto: UpdateUserDto): Promise<"user not found" | "user updated">;
    updateUserPassword(id: string, updatePasswordDto: UpdatePasswordDto): Promise<"password was successfully updated" | "incorrect conf. password" | "incorrect password">;
    remove(id: string): Promise<"user not found" | "user deleted">;
    verifyEmail(email: string, emailToken: string): Promise<"user not found" | "user was successfully  verified" | "oops">;
}
