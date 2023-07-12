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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../user/entities/user.entity");
const product_entity_1 = require("../product/entities/product.entity");
const order_entity_1 = require("./entities/order.entity");
let OrderService = exports.OrderService = class OrderService {
    constructor(userModel, productModel, orderModel) {
        this.userModel = userModel;
        this.productModel = productModel;
        this.orderModel = orderModel;
    }
    async create(createOrderDto) {
        try {
            const user = await this.userModel.findById(createOrderDto.user);
            if (!user) {
                throw new common_1.NotFoundException('user not found');
            }
            const product = await this.productModel.findById(createOrderDto.product);
            if (product) {
                const order = new this.orderModel(createOrderDto);
                await order.save();
                await this.userModel.findByIdAndUpdate(user._id, { order: [...user.order, order._id] });
                return "order added";
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
        return this.orderModel.find().populate('user', 'name').populate('product');
    }
    async findOne(id) {
        try {
            const order = await this.orderModel.findById(id);
            if (!order) {
                return 'product not found';
            }
            else {
                return (await order.populate('user', 'name')).populate('product');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async update(id, updateOrderDto) {
        try {
            const order = await this.orderModel.findById(id);
            if (!order) {
                return 'product not found';
            }
            const user = await this.userModel.findById(order.user);
            const product = await this.productModel.findById(order.product);
            if (user && product) {
                await this.orderModel.findByIdAndUpdate(id, updateOrderDto);
                return "order updated";
            }
            else {
                throw new common_1.NotFoundException('user or product not found');
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async remove(id) {
        try {
            const order = await this.orderModel.findById(id);
            if (!order) {
                throw new common_1.NotFoundException('order not found');
            }
            const user = await this.userModel.findById(order.user);
            if (user) {
                const product = await this.productModel.findById(order.product);
                if (product) {
                    const updateOrder = user.order.filter((order) => order._id != id);
                    await this.userModel.findByIdAndUpdate(user._id, { order: [...updateOrder] });
                    await this.orderModel.findByIdAndDelete(id);
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
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(order_entity_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], OrderService);
//# sourceMappingURL=order.service.js.map