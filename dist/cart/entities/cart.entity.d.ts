import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
export type CartDocument = HydratedDocument<Cart>;
export declare class Cart {
    quantity: string;
    product: Product;
    user: User;
}
export declare const CartSchema: mongoose.Schema<Cart, mongoose.Model<Cart, any, any, any, mongoose.Document<unknown, any, Cart> & Omit<Cart & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cart, mongoose.Document<unknown, {}, mongoose.FlatRecord<Cart>> & Omit<mongoose.FlatRecord<Cart> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
