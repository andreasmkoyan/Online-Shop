"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const swagger_1 = require("@nestjs/swagger");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let UserController = exports.UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto, res) {
        try {
            const data = await this.userService.create(createUserDto);
            return res.status(common_1.HttpStatus.CREATED).json({ data });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async uploadFile(id, file) {
        try {
            const data = await this.userService.uploadProfileImage(file, id);
        }
        catch (e) {
            throw new common_1.BadRequestException({ message: e.message });
        }
    }
    findAll() {
        return this.userService.findAll();
    }
    async findOne(id, res) {
        try {
            const data = await this.userService.findOne(id);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async Wish(updateWishDto, res) {
        try {
            const data = await this.userService.addToWishList(updateWishDto);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    getWishList(id) {
        return this.userService.getUserWishList(id);
    }
    async update(id, updateUserDto, res) {
        try {
            const data = await this.userService.update(id, updateUserDto);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async updatePassword(id, updatePasswordDto, res) {
        try {
            const data = await this.userService.updateUserPassword(id, updatePasswordDto);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async remove(id, res) {
        try {
            const data = await this.userService.remove(id);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async verify(email, emailToken, res) {
        try {
            const data = await this.userService.verifyEmail(email, emailToken);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
};
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('upload/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', { storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                cb(null, `${randomName}${(0, path_1.extname)(file.originalname)}`);
            }
        })
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)('file')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('addToWishList'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_user_dto_1.UpdateWishDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "Wish", null);
__decorate([
    (0, common_1.Get)('wishList/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getWishList", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)('updatePassword/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdatePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/email/verify'),
    __param(0, (0, common_1.Query)('email')),
    __param(1, (0, common_1.Query)('emailToken')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "verify", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('user'),
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map