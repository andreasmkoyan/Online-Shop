import { ApiProperty } from "@nestjs/swagger";
import { RoleApi } from "../role/enum.role";

export class CreateUserDto {
    @ApiProperty()
    name:string
    @ApiProperty()
    surname:string
    @ApiProperty()
    age:number
    @ApiProperty()
    email:string
    @ApiProperty()
    username:string
    @ApiProperty()
    password:string
    @ApiProperty({default:[RoleApi.USER,RoleApi.MANAGER]})
    roles:RoleApi[]
    
    
}
export class CreatePasswordDto {
    @ApiProperty()
    oldpassword:string
    @ApiProperty()
    newpassword:string
    @ApiProperty()
    confpassword:string
}
export class CreateWishDto{
    @ApiProperty()
    userid:string
    @ApiProperty()
    productid:string;
}