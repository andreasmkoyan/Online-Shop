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
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { User } from 'src/user/entities/user.entity';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
export declare class CategoryService {
    private userModel;
    private categoryModel;
    private productModel;
    constructor(userModel: Model<User>, categoryModel: Model<Category>, productModel: Model<Product>);
    create(createCategoryDto: CreateCategoryDto): Promise<"user not found" | "category created">;
    findAll(): import("mongoose").Query<Omit<import("mongoose").Document<unknown, {}, Category> & Omit<Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[], import("mongoose").Document<unknown, {}, Category> & Omit<Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, Category, "find">;
    findOne(id: string): Promise<"not found" | Omit<import("mongoose").Document<unknown, {}, Category> & Omit<Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<"not found category" | "not found user" | "category updated">;
    remove(id: string): Promise<"product not found" | "not found category" | "category deleted">;
}
