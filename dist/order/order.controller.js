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
exports.OrderController = void 0;
const common_1 = require("@nestjs/common");
const order_service_1 = require("./order.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const swagger_1 = require("@nestjs/swagger");
let OrderController = exports.OrderController = class OrderController {
    constructor(orderService) {
        this.orderService = orderService;
    }
    async create(createOrderDto, res) {
        try {
            const data = await this.orderService.create(createOrderDto);
            return res.status(common_1.HttpStatus.CREATED).json({ data });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    findAll() {
        return this.orderService.findAll();
    }
    async findOne(id, res) {
        try {
            const data = await this.orderService.findOne(id);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async update(id, updateOrderDto, res) {
        try {
            const data = await this.orderService.update(id, updateOrderDto);
            return res.status(common_1.HttpStatus.OK).json({ data });
        }
        catch (e) {
            return res.status(common_1.HttpStatus.BAD_REQUEST).json({ message: e.message });
        }
    }
    async remove(id, res) {
        try {
            const data = await this.orderService.remove(id);
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
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OrderController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "remove", null);
exports.OrderController = OrderController = __decorate([
    (0, swagger_1.ApiTags)('order'),
    (0, common_1.Controller)('order'),
    __metadata("design:paramtypes", [order_service_1.OrderService])
], OrderController);
//# sourceMappingURL=order.controller.js.map