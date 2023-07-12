import mongoose, { HydratedDocument } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
export type CategoryDocument = HydratedDocument<Category>;
export declare class Category {
    name: string;
    picUrl: string;
    user: User;
}
export declare const CategorySchema: mongoose.Schema<Category, mongoose.Model<Category, any, any, any, mongoose.Document<unknown, any, Category> & Omit<Category & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Category, mongoose.Document<unknown, {}, mongoose.FlatRecord<Category>> & Omit<mongoose.FlatRecord<Category> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
