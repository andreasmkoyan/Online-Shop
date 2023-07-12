"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const product_entity_1 = require("../product/entities/product.entity");
const order_entity_1 = require("../order/entities/order.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const comment_entity_1 = require("../comment/entities/comment.entity");
const category_entity_1 = require("../category/entities/category.entity");
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: user_entity_1.User.name, schema: user_entity_1.UserSchema }, { name: category_entity_1.Category.name, schema: category_entity_1.CategorySchema }, { name: product_entity_1.Product.name, schema: product_entity_1.ProductSchema }, { name: order_entity_1.Order.name, schema: order_entity_1.OrderSchema }, { name: cart_entity_1.Cart.name, schema: cart_entity_1.CartSchema }, { name: comment_entity_1.Comment.name, schema: comment_entity_1.CommentSchema }])],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService]
    })
], UserModule);
//# sourceMappingURL=user.module.js.map