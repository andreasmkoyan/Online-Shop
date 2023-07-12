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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../user/entities/user.entity");
const mongoose_2 = require("mongoose");
const product_entity_1 = require("./entities/product.entity");
const comment_entity_1 = require("../comment/entities/comment.entity");
const category_entity_1 = require("../category/entities/category.entity");
let ProductService = exports.ProductService = class ProductService {
    constructor(userModel, productModel, commentModel, categoryModel) {
        this.userModel = userModel;
        this.productModel = productModel;
        this.commentModel = commentModel;
        this.categoryModel = categoryModel;
    }
    async create(createProductDto) {
        try {
            const user = await this.userModel.findById(createProductDto.user);
            const category = await this.categoryModel.findById(createProductDto.category);
            if (!user || !category) {
                return "incorrect datas";
            }
            else {
                const product = new this.productModel(createProductDto);
                await product.save();
                await this.userModel.findByIdAndUpdate(user._id, { products: [...user.products, product._id] });
                return "product created";
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    findAll() {
        return this.productModel.find().populate('user', 'name').populate('comments.text');
    }
    async findOne(id) {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                return 'product not found';
            }
            else {
                return product.populate('user');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async update(id, updateProductDto) {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                return 'product not found';
            }
            const user = await this.userModel.findById(product.user);
            if (user) {
                await this.productModel.findByIdAndUpdate(id, updateProductDto);
                return "product updated";
            }
            else {
                throw new common_1.NotFoundException('user not found');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async remove(id) {
        try {
            const product = await this.productModel.findById(id);
            if (!product) {
                throw new common_1.NotFoundException('not found');
            }
            const user = await this.userModel.findById(product.user);
            if (user) {
                const updateProduct = user.products.filter((product) => product._id != id);
                await this.userModel.findByIdAndUpdate(user._id, { products: [...updateProduct] });
                await this.commentModel.deleteMany(product._id);
                await this.productModel.findByIdAndDelete(id);
                return 'product deleted';
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
};
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(comment_entity_1.Comment.name)),
    __param(3, (0, mongoose_1.InjectModel)(category_entity_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductService);
//# sourceMappingURL=product.service.js.map