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
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { Product } from './entities/product.entity';
import { Comment } from 'src/comment/entities/comment.entity';
import { Category } from 'src/category/entities/category.entity';
export declare class ProductService {
    private userModel;
    private productModel;
    private commentModel;
    private categoryModel;
    constructor(userModel: Model<User>, productModel: Model<Product>, commentModel: Model<Comment>, categoryModel: Model<Category>);
    create(createProductDto: CreateProductDto): Promise<"incorrect datas" | "product created">;
    findAll(): import("mongoose").Query<Omit<Omit<import("mongoose").Document<unknown, {}, Product> & Omit<Product & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[], import("mongoose").Document<unknown, {}, Product> & Omit<Product & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, Product, "find">;
    findOne(id: string): Promise<"product not found" | Omit<import("mongoose").Document<unknown, {}, Product> & Omit<Product & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<"product not found" | "product updated">;
    remove(id: string): Promise<string>;
}
