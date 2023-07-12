import { Body, Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { multerOptions } from "./config";
import { UserService } from "src/user/user.service";
import { ApiConsumes, ApiProperty, ApiTags } from "@nestjs/swagger";

export class UploadFileDto {
    
   
    @ApiProperty({type:"file"})
    file: any;
}

@ApiTags('upload')
@Controller('upload')
export class UploadController{

 

@Post()
@ApiConsumes('multipart/form-data')
@UseInterceptors(FilesInterceptor('file',null,multerOptions))

    async UploadedFile(@Body()uploadfile:UploadFileDto, @UploadedFiles()file){
        console.log(uploadfile)
    }

}