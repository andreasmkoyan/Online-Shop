"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const comment_controller_1 = require("./comment.controller");
const mongoose_1 = require("@nestjs/mongoose");
const comment_entity_1 = require("./entities/comment.entity");
const product_entity_1 = require("../product/entities/product.entity");
const user_entity_1 = require("../user/entities/user.entity");
let CommentModule = exports.CommentModule = class CommentModule {
};
exports.CommentModule = CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: comment_entity_1.Comment.name, schema: comment_entity_1.CommentSchema }, { name: product_entity_1.Product.name, schema: product_entity_1.ProductSchema }, { name: user_entity_1.User.name, schema: user_entity_1.UserSchema }])],
        controllers: [comment_controller_1.CommentController],
        providers: [comment_service_1.CommentService]
    })
], CommentModule);
//# sourceMappingURL=comment.module.js.map