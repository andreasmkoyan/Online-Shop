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
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Cart } from './entities/cart.entity';
export declare class CartService {
    private userModel;
    private productModel;
    private cartModel;
    constructor(userModel: Model<User>, productModel: Model<Product>, cartModel: Model<Cart>);
    create(createCartDto: CreateCartDto): Promise<string>;
    findAll(): import("mongoose").Query<Omit<Omit<import("mongoose").Document<unknown, {}, Cart> & Omit<Cart & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[], import("mongoose").Document<unknown, {}, Cart> & Omit<Cart & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, Cart, "find">;
    findOne(id: string): Promise<"product not found" | Omit<import("mongoose").Document<unknown, {}, Cart> & Omit<Cart & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    update(id: string, updateCartDto: UpdateCartDto): Promise<"product not found" | "cart updated">;
    remove(id: string): Promise<string>;
}
