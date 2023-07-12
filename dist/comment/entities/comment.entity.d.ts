import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
export type CommentDocument = HydratedDocument<Comment>;
export declare class Comment {
    text: string;
    product: Product;
    user: User;
}
export declare const CommentSchema: mongoose.Schema<Comment, mongoose.Model<Comment, any, any, any, mongoose.Document<unknown, any, Comment> & Omit<Comment & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Comment, mongoose.Document<unknown, {}, mongoose.FlatRecord<Comment>> & Omit<mongoose.FlatRecord<Comment> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
