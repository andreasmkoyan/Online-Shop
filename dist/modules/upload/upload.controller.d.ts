export declare class UploadFileDto {
    file: any;
}
export declare class UploadController {
    UploadedFile(uploadfile: UploadFileDto, file: any): Promise<void>;
}
