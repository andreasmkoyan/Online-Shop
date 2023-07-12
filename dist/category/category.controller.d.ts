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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Response } from 'express';
export declare class CategoryController {
    private readonly categoryService;
    constructor(categoryService: CategoryService);
    create(createCategoryDto: CreateCategoryDto, res: Response): Promise<Response<any, Record<string, any>>>;
    findAll(): import("mongoose").Query<Omit<import("mongoose").Document<unknown, {}, import("./entities/category.entity").Category> & Omit<import("./entities/category.entity").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>[], import("mongoose").Document<unknown, {}, import("./entities/category.entity").Category> & Omit<import("./entities/category.entity").Category & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("./entities/category.entity").Category, "find">;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<"not found category" | "not found user" | "category updated">;
    remove(id: string): Promise<"product not found" | "not found category" | "category deleted">;
}
