import mongoose, { HydratedDocument } from 'mongoose';
import { Cart } from 'src/cart/entities/cart.entity';
import { Category } from 'src/category/entities/category.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Role } from '../role/enum.role';
export type UserDocument = HydratedDocument<User>;
export declare class User {
    name: string;
    surname: string;
    age: number;
    email: string;
    username: string;
    picUrl: string;
    password: string;
    roles: Role[];
    emailToken: string;
    verify: number;
    products: Product[];
    categories: Category[];
    wishs: Product[];
    carts: Cart[];
    order: Order[];
}
export declare const UserSchema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & Omit<User & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & Omit<mongoose.FlatRecord<User> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
