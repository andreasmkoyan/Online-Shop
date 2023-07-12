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
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../user/entities/user.entity");
const mongoose_2 = require("mongoose");
const category_entity_1 = require("./entities/category.entity");
const product_entity_1 = require("../product/entities/product.entity");
let CategoryService = exports.CategoryService = class CategoryService {
    constructor(userModel, categoryModel, productModel) {
        this.userModel = userModel;
        this.categoryModel = categoryModel;
        this.productModel = productModel;
    }
    async create(createCategoryDto) {
        try {
            const user = await this.userModel.findById(createCategoryDto.user);
            if (!user) {
                return 'user not found';
            }
            else {
                const category = new this.categoryModel(createCategoryDto);
                await category.save();
                await this.userModel.findByIdAndUpdate(user._id, { categories: [...user.categories, category._id] });
                return 'category created';
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    findAll() {
        return this.categoryModel.find().populate('user', 'name');
    }
    async findOne(id) {
        try {
            const category = await this.categoryModel.findById(id);
            if (!category) {
                return "not found";
            }
            else {
                return category.populate('user', 'name');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async update(id, updateCategoryDto) {
        try {
            const category = await this.categoryModel.findById(id);
            if (!category) {
                return "not found category";
            }
            else {
                const user = await this.userModel.findById(category.user);
                if (!user) {
                    return "not found user";
                }
                else {
                    await this.categoryModel.findByIdAndUpdate(id, updateCategoryDto);
                    return 'category updated';
                }
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async remove(id) {
        try {
            const category = await this.categoryModel.findById(id);
            if (!category) {
                return "not found category";
            }
            const user = await this.userModel.findById(category.user);
            const product = await this.productModel.findById(category._id);
            if (product) {
                await this.productModel.deleteMany(product._id);
            }
            else {
                return 'product not found';
            }
            if (user) {
                let updateCategory = user.categories.filter((category) => category._id != id);
                console.log(updateCategory);
                await this.userModel.findByIdAndUpdate(user._id, { categiries: [...updateCategory] });
                await this.categoryModel.findByIdAndDelete(id);
                await this.productModel.deleteMany(category._id);
                console.log(user.categories);
                return 'category deleted';
            }
            else {
                throw new common_1.NotFoundException('user not found');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
};
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(category_entity_1.Category.name)),
    __param(2, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CategoryService);
//# sourceMappingURL=category.service.js.map