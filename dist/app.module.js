"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_module_1 = require("./user/user.module");
const product_module_1 = require("./product/product.module");
const category_module_1 = require("./category/category.module");
const comment_module_1 = require("./comment/comment.module");
const cart_module_1 = require("./cart/cart.module");
const order_module_1 = require("./order/order.module");
const mailer_1 = require("@nestjs-modules/mailer");
const upload_module_1 = require("./modules/upload/upload.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forRoot('mongodb://127.0.0.1:27017/project'), user_module_1.UserModule, product_module_1.ProductModule, category_module_1.CategoryModule, comment_module_1.CommentModule, cart_module_1.CartModule, order_module_1.OrderModule, auth_module_1.AuthModule,
            mailer_1.MailerModule.forRootAsync({
                useFactory: () => ({
                    transport: {
                        service: 'gmail',
                        tls: {
                            ciphers: 'SSLv3',
                        },
                        secure: false,
                        auth: {
                            user: "andreasmkoyanreact@gmail.com",
                            pass: 'qgeveuwnockgldts',
                        },
                    },
                    defaults: {
                        from: '"nest-modules" <user@outlook.com>',
                    },
                }),
            }),
            mailer_1.MailerModule, upload_module_1.UploadModule, auth_module_1.AuthModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map