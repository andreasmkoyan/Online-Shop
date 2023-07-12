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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_entity_1 = require("./entities/user.entity");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const product_entity_1 = require("../product/entities/product.entity");
const cart_entity_1 = require("../cart/entities/cart.entity");
const order_entity_1 = require("../order/entities/order.entity");
const category_entity_1 = require("../category/entities/category.entity");
const comment_entity_1 = require("../comment/entities/comment.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const crypto = require("crypto");
let UserService = exports.UserService = class UserService {
    constructor(userModel, productModel, cartModel, orderModel, categoryModel, commentModel, mailerService) {
        this.userModel = userModel;
        this.productModel = productModel;
        this.cartModel = cartModel;
        this.orderModel = orderModel;
        this.categoryModel = categoryModel;
        this.commentModel = commentModel;
        this.mailerService = mailerService;
    }
    async create(createUserDto) {
        try {
            const data = await this.userModel.findOne({
                $or: [{
                        username: createUserDto.username,
                        email: createUserDto.email
                    }]
            });
            console.log(data);
            if (!data) {
                if (createUserDto.roles.length > 2 || createUserDto.roles.length === 0) {
                    throw new common_1.BadRequestException('roles error');
                }
                else if (!createUserDto.roles.every(e => e == 'user' || e === 'manager')) {
                    throw new common_1.BadRequestException('incorrect roles');
                }
                const hash = bcrypt.hashSync(createUserDto.password, 10);
                const token = crypto.randomUUID();
                const us = new this.userModel(Object.assign(Object.assign({}, createUserDto), { password: hash, emailToken: token, verify: 0 }));
                this
                    .mailerService
                    .sendMail({
                    to: createUserDto.email,
                    from: 'baghramyangayane9@gmail.com',
                    subject: 'Testing Nest MailerModule ✔',
                    text: 'welcome',
                    html: `<div><h1>hello my dear ${createUserDto.name} </h1>
              <a href="http://localhost:3000/user/email/verify?email=${createUserDto.email}&emailToken=${token}"> verify </a></div>`
                }).then((success) => {
                    console.log(success);
                })
                    .catch((err) => {
                    console.log(err);
                });
                return us.save();
            }
            else {
                return 'email or username has already exist';
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ mess: e.message });
        }
    }
    async findOneByEmailOrUsername(usernameOrEmail) {
        return this.userModel.findOne({
            $or: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
        });
    }
    findAll() {
        return this.userModel.find().populate('products').populate('categories');
    }
    async findOne(id) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                return "user not found";
            }
            else {
                return user;
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ mess: e.message });
        }
    }
    async uploadProfileImage(file, id) {
        try {
            const user = await this.userModel.findById(id);
            if (user) {
                await this.userModel.findByIdAndUpdate(user._id, { picUrl: file.filename });
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async addToWishList(updateWishDto) {
        try {
            const user = await this.userModel.findById(updateWishDto.userid);
            if (!user) {
                return "user not found";
            }
            const product = await this.productModel.findById(updateWishDto.productid);
            console.log(user.wishs.some(() => this.productModel.findById(updateWishDto.productid)));
            if (product) {
                if (!user.wishs.some(() => this.productModel.findById(updateWishDto.productid))) {
                    await this.userModel.findByIdAndUpdate(user._id, { wishs: [...user.wishs, product._id] });
                    return "product added to wishlist";
                }
                else {
                    return "product exist";
                }
            }
            else {
                return "product not found";
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ mess: e.message });
        }
    }
    async getUserWishList(id) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                return "user not found";
            }
            let products = [];
            for (let el of user.wishs) {
                const p = await this.productModel.findById(el);
                products.push(p);
            }
            return products;
        }
        catch (e) {
            throw new common_1.NotFoundException({ mess: e.message });
        }
    }
    async update(id, updateUserDto) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                return 'user not found';
            }
            else {
                await this.userModel.findByIdAndUpdate(id, { name: updateUserDto.name, surname: updateUserDto.surname, age: updateUserDto.age });
                return 'user updated';
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async updateUserPassword(id, updatePasswordDto) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                throw new common_1.NotFoundException('user not found');
            }
            if (bcrypt.compareSync(updatePasswordDto.oldpassword, user.password)) {
                if ((updatePasswordDto.newpassword === updatePasswordDto.confpassword)) {
                    const hash = bcrypt.hashSync(updatePasswordDto.newpassword, 10);
                    await this.userModel.findByIdAndUpdate(user._id, { password: hash });
                    return "password was successfully updated";
                }
                else {
                    return 'incorrect conf. password';
                }
            }
            else {
                return "incorrect password";
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async remove(id) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                return 'user not found';
            }
            else {
                await this.productModel.deleteMany({ user: user._id });
                await this.orderModel.deleteMany({ user: user._id });
                await this.commentModel.deleteMany({ user: user._id });
                await this.categoryModel.deleteMany({ user: user._id });
                await this.cartModel.deleteMany({ user: user._id });
                await this.userModel.findByIdAndDelete(id);
                return "user deleted";
            }
        }
        catch (e) {
            throw new common_1.NotFoundException({ message: e.message });
        }
    }
    async verifyEmail(email, emailToken) {
        try {
            console.log(email);
            const user = await this.userModel.findOne({ email, emailToken });
            if (user) {
                await this.userModel.findByIdAndUpdate(user._id, { verify: 1, emailToken: null });
                return "user was successfully  verified";
            }
            else {
                return 'user not found';
            }
        }
        catch (e) {
            return ('oops');
        }
    }
};
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_entity_1.Product.name)),
    __param(2, (0, mongoose_1.InjectModel)(cart_entity_1.Cart.name)),
    __param(3, (0, mongoose_1.InjectModel)(order_entity_1.Order.name)),
    __param(4, (0, mongoose_1.InjectModel)(category_entity_1.Category.name)),
    __param(5, (0, mongoose_1.InjectModel)(comment_entity_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mailer_1.MailerService])
], UserService);
//# sourceMappingURL=user.service.js.map