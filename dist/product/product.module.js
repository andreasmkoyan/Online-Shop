"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModule = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_controller_1 = require("./product.controller");
const mongoose_1 = require("@nestjs/mongoose");
const product_entity_1 = require("./entities/product.entity");
const category_entity_1 = require("../category/entities/category.entity");
const comment_entity_1 = require("../comment/entities/comment.entity");
const user_entity_1 = require("../user/entities/user.entity");
let ProductModule = exports.ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: product_entity_1.Product.name, schema: product_entity_1.ProductSchema }, { name: category_entity_1.Category.name, schema: category_entity_1.CategorySchema }, { name: comment_entity_1.Comment.name, schema: comment_entity_1.CommentSchema }, { name: user_entity_1.User.name, schema: user_entity_1.UserSchema }])],
        controllers: [product_controller_1.ProductController],
        providers: [product_service_1.ProductService]
    })
], ProductModule);
//# sourceMappingURL=product.module.js.map