import { HttpException, HttpStatus } from "@nestjs/common"
import { existsSync, mkdirSync } from "fs"
import { extname } from "path"
import { createBrotliCompress } from "zlib"
import {v4 as uuid} from 'uuid'
import {diskStorage} from 'multer'



export const muletrConfig = {
    dest:'uploads'
}
function uuidRandom(file){
    const result = `${uuid}${extname(file.originalname)}`
}

export const multerOptions = {
    filefilter:(req:any,file:any,cb:any)=>{
        if(file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)){
        
        cb(null,true)
    }
    else{
        cb(new HttpException(`Unsupported file type ${extname(file.originalname)}`,HttpStatus.BAD_REQUEST),false)
    }

},
storage:diskStorage({
    destination:(req:any,file:any,cb:any) =>{
        const uploadPath= muletrConfig.dest
        if(!existsSync(uploadPath)){
mkdirSync(uploadPath)
        }
        cb(null,uploadPath)
    },
    filename:(req:any,file:any,cb:any)=>{
        cb(null,uuidRandom(file))
    }
})

}