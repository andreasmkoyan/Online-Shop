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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../user/entities/user.entity");
const product_entity_1 = require("../product/entities/product.entity");
const cart_entity_1 = require("./entities/cart.entity");
let CartService = exports.CartService = class CartService {
    constructor(userModel, productModel, cartModel) {
        this.userModel = userModel;
        this.productModel = productModel;
        this.cartModel = cartModel;
    }
    async create(createCartDto) {
        try {
            const user = await this.userModel.findById(createCartDto.user);
            if (!user) {
                throw new common_1.NotFoundException('user not found');
            }
            const product = await this.productModel.findById(createCartDto.product);
            if (product) {
                const cart = new this.cartModel(createCartDto);
                await cart.save();
                await this.userModel.findByIdAndUpdate(user._id, { carts: [...user.carts, cart._id] });
                return "cart added";
            }
            else {
                throw new common_1.NotFoundException('product not found');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException('not found');
        }
    }
    findAll() {
        return this.cartModel.find().populate('user').populate('product');
    }
    async findOne(id) {
        try {
            const cart = await this.cartModel.findById(id);
            if (!cart) {
                return 'product not found';
            }
            else {
                return (await cart.populate('user', 'name')).populate('product');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async update(id, updateCartDto) {
        try {
            const cart = await this.cartModel.findById(id);
            if (!cart) {
                return 'product not found';
            }
            const user = await this.userModel.findById(cart.user);
            if (user) {
                const product = await this.productModel.findById(cart.product);
                if (product) {
                    await this.cartModel.findByIdAndUpdate(id, updateCartDto);
                    return "cart updated";
                }
                else {
                    throw new common_1.NotFoundException('product not found');
                }
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
            const cart = await this.cartModel.findById(id);
            if (!cart) {
                throw new common_1.NotFoundException('order not found');
            }
            const user = await this.userModel.findById(cart.user);
            if (user) {
                const product = await this.productModel.findById(cart.product);
                if (product) {
                    const updateCart = user.carts.filter((cart) => cart._id != id);
                    await this.userModel.findByIdAndUpdate(user._id, { carts: [...updateCart] });
                    await this.cartModel.findByIdAndDelete(id);
                    return 'order deleted';
                }
                else {
                    throw new common_1.NotFoundException('product not found');
                }
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
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(cart_entity_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], CartService);
//# sourceMappingURL=cart.service.js.map