"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateWishDto = exports.UpdatePasswordDto = exports.UpdateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./create-user.dto");
const create_user_dto_2 = require("./create-user.dto");
const create_user_dto_3 = require("./create-user.dto");
class UpdateUserDto extends (0, swagger_1.PartialType)(create_user_dto_1.CreateUserDto) {
}
exports.UpdateUserDto = UpdateUserDto;
class UpdatePasswordDto extends (0, swagger_1.PartialType)(create_user_dto_2.CreatePasswordDto) {
}
exports.UpdatePasswordDto = UpdatePasswordDto;
class UpdateWishDto extends (0, swagger_1.PartialType)(create_user_dto_3.CreateWishDto) {
}
exports.UpdateWishDto = UpdateWishDto;
//# sourceMappingURL=update-user.dto.js.map