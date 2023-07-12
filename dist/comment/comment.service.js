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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("../user/entities/user.entity");
const mongoose_2 = require("mongoose");
const product_entity_1 = require("../product/entities/product.entity");
const comment_entity_1 = require("./entities/comment.entity");
let CommentService = exports.CommentService = class CommentService {
    constructor(userModel, productModel, commentModel) {
        this.userModel = userModel;
        this.productModel = productModel;
        this.commentModel = commentModel;
    }
    async create(createCommentDto) {
        try {
            const product = await this.productModel.findById(createCommentDto.product);
            if (!product) {
                throw new common_1.NotFoundException('product not found');
            }
            const user = await this.userModel.findById(createCommentDto.user);
            if (!user) {
                throw new common_1.NotFoundException('user not found');
            }
            else {
                const comment = new this.commentModel(createCommentDto);
                await comment.save();
                await this.productModel.findByIdAndUpdate(product._id, { comments: [...product.comments, product._id] });
                return 'comment added';
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    findAll() {
        return this.commentModel.find().populate('user', 'name').populate('product', 'title');
    }
    async findOne(id) {
        try {
            const comment = await this.commentModel.findById(id);
            if (!comment) {
                return 'comment not found';
            }
            else {
                return (await comment.populate('user', 'name')).populate('product', 'title');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async update(id, updateCommentDto) {
        try {
            const comment = await this.commentModel.findById(id);
            if (!comment) {
                return 'comment not found';
            }
            const user = await this.userModel.findById(comment.user);
            const product = await this.productModel.findById(comment.product);
            if (user && product) {
                await this.commentModel.findByIdAndUpdate(updateCommentDto);
                return "product updated";
            }
            else {
                throw new common_1.NotFoundException('user or product not found ');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async remove(id) {
        try {
            const comment = await this.commentModel.findById(id);
            if (!comment) {
                throw new common_1.NotFoundException('not found');
            }
            const user = await this.userModel.findById(comment.user);
            const product = await this.productModel.findById(comment.product);
            if (user && product) {
                const updateComment = product.comments.filter((comment) => comment._id != id);
                await this.productModel.findByIdAndUpdate(product._id, { comments: [...updateComment] });
                await this.commentModel.findByIdAndDelete(id);
                return 'comment deleted';
            }
            else {
                throw new common_1.NotFoundException('user or product not found');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
};
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(comment_entity_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CommentService);
//# sourceMappingURL=comment.service.js.map