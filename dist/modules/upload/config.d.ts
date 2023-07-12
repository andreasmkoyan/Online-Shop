/// <reference types="multer" />
export declare const muletrConfig: {
    dest: string;
};
export declare const multerOptions: {
    filefilter: (req: any, file: any, cb: any) => void;
    storage: import("multer").StorageEngine;
};
