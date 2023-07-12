import { Module } from "@nestjs/common";
import { UploadService } from "./upload.service";
import { UploadController } from "./upload.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/user/entities/user.entity";

@Module({
    imports:[MongooseModule,UploadModule],
    providers:[UploadService],
    controllers:[UploadController]
})


export class UploadModule{}
