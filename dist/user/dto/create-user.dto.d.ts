import { RoleApi } from "../role/enum.role";
export declare class CreateUserDto {
    name: string;
    surname: string;
    age: number;
    email: string;
    username: string;
    password: string;
    roles: RoleApi[];
}
export declare class CreatePasswordDto {
    oldpassword: string;
    newpassword: string;
    confpassword: string;
}
export declare class CreateWishDto {
    userid: string;
    productid: string;
}
