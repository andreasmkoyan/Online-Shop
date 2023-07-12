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
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Model } from 'mongoose';
import { User } from 'src/user/entities/user.entity';
import { Product } from 'src/product/entities/product.entity';
import { Order } from './entities/order.entity';
export declare class OrderService {
    private userModel;
    private productModel;
    private orderModel;
    constructor(userModel: Model<User>, productModel: Model<Product>, orderModel: Model<Order>);
    create(createOrderDto: CreateOrderDto): Promise<string>;
    findAll(): import("mongoose").Query<Omit<Omit<import("mongoose").Document<unknown, {}, Order> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[], import("mongoose").Document<unknown, {}, Order> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, Order, "find">;
    findOne(id: string): Promise<"product not found" | Omit<import("mongoose").Document<unknown, {}, Order> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<"product not found" | "order updated">;
    remove(id: string): Promise<string>;
}
