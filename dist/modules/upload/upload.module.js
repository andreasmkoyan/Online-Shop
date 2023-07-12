"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UploadModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadModule = void 0;
const common_1 = require("@nestjs/common");
const upload_service_1 = require("./upload.service");
const upload_controller_1 = require("./upload.controller");
const mongoose_1 = require("@nestjs/mongoose");
let UploadModule = exports.UploadModule = UploadModule_1 = class UploadModule {
};
exports.UploadModule = UploadModule = UploadModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule, UploadModule_1],
        providers: [upload_service_1.UploadService],
        controllers: [upload_controller_1.UploadController]
    })
], UploadModule);
//# sourceMappingURL=upload.module.js.map