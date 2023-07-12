/// <reference types="multer" />
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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto, UpdatePasswordDto, UpdateWishDto } from './dto/update-user.dto';
import { Response } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(createUserDto: CreateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    uploadFile(id: string, file: Express.Multer.File): Promise<void>;
    findAll(): import("mongoose").Query<Omit<Omit<import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & Omit<import("./entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, never>, never>[], import("mongoose").Document<unknown, {}, import("./entities/user.entity").User> & Omit<import("./entities/user.entity").User & {
        _id: import("mongoose").Types.ObjectId;
    }, never>, {}, import("./entities/user.entity").User, "find">;
    findOne(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    Wish(updateWishDto: UpdateWishDto, res: Response): Promise<Response<any, Record<string, any>>>;
    getWishList(id: string): Promise<any[] | "user not found">;
    update(id: string, updateUserDto: UpdateUserDto, res: Response): Promise<Response<any, Record<string, any>>>;
    updatePassword(id: string, updatePasswordDto: UpdatePasswordDto, res: Response): Promise<Response<any, Record<string, any>>>;
    remove(id: string, res: Response): Promise<Response<any, Record<string, any>>>;
    verify(email: string, emailToken: string, res: Response): Promise<Response<any, Record<string, any>>>;
}
