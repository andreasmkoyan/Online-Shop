import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
export type OrderDocument = HydratedDocument<Order>;
export declare class Order {
    quantity: string;
    product: Product;
    user: User;
    price: number;
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order> & Omit<Order & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>> & Omit<mongoose.FlatRecord<Order> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
