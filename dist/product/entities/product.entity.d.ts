import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
export type ProductDocument = HydratedDocument<Product>;
export declare class Product {
    title: string;
    body: string;
    picUrl: string[];
    price: number;
    count: number;
    user: User;
    rating: Record<string, User>;
    category: Category;
    comments: Comment[];
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, mongoose.Document<unknown, any, Product> & Omit<Product & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, mongoose.FlatRecord<Product>> & Omit<mongoose.FlatRecord<Product> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
