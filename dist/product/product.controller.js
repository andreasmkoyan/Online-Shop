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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const create_product_dto_1 = require("./dto/create-product.dto");
const update_product_dto_1 = require("./dto/update-product.dto");
const swagger_1 = require("@nestjs/swagger");
let ProductController = exports.ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async create(createProductDto, res) {
        try {
            const data = await this.productService.create(createProductDto);
            return res.status(common_1.HttpStatus.CREATED).json({ data });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    findAll() {
        return this.productService.findAll();
    }
    async findOne(id, res) {
        try {
            const data = await this.productService.findOne(id);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async update(id, updateProductDto, res) {
        try {
            const data = await this.productService.update(id, updateProductDto);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async remove(id, res) {
        try {
            const data = await this.productService.remove(id);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_product_dto_1.UpdateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "remove", null);
exports.ProductController = ProductController = __decorate([
    (0, swagger_1.ApiTags)('product'),
    (0, common_1.Controller)('product'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
//# sourceMappingURL=product.controller.js.map