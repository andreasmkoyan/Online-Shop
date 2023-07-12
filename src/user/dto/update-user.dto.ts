import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { CreatePasswordDto } from './create-user.dto';
import { CreateWishDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class UpdatePasswordDto extends PartialType(CreatePasswordDto){}
export class UpdateWishDto extends PartialType(CreateWishDto){}