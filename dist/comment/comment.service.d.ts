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
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';
import { Comment } from './entities/comment.entity';
export declare class CommentService {
    private userModel;
    private productModel;
    private commentModel;
    constructor(userModel: Model<User>, productModel: Model<Product>, commentModel: Model<Comment>);
    create(createCommentDto: CreateCommentDto): Promise<string>;
    findAll(): import("mongoose").Query<Omit<Omit<import("mongoose").Document<unknown, {}, Comment> & Omit<Comment & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[], import("mongoose").Document<unknown, {}, Comment> & Omit<Comment & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, Comment, "find">;
    findOne(id: string): Promise<"comment not found" | Omit<import("mongoose").Document<unknown, {}, Comment> & Omit<Comment & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    update(id: string, updateCommentDto: UpdateCommentDto): Promise<"product updated" | "comment not found">;
    remove(id: string): Promise<string>;
}
