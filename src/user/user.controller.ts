import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, Query, NotFoundException, UseInterceptors, UploadedFiles, UploadedFile, Req, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto,CreatePasswordDto, CreateWishDto } from './dto/create-user.dto';
import { UpdateUserDto,UpdatePasswordDto,UpdateWishDto} from './dto/update-user.dto';
import { ApiBody, ApiConsumes, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response, query } from 'express';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path, { extname } from 'path';
import {v4 as uuid4} from 'uuid'
import {multerOptions} from '../modules/upload/config'




@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,) {}






  @Post('signup')
 async create(@Body() createUserDto: CreateUserDto,@Res() res:Response) {
  try{
  const data = await this.userService.create(createUserDto);
  return res.status(HttpStatus.CREATED).json({data})
  }
    
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
  }
  }

//https://notiz.dev/blog/type-safe-file-uploads
@Post('upload/:id')
 @UseInterceptors(FileInterceptor('file',{storage: diskStorage({
    destination: './uploads'
    , filename: (req, file, cb) => {
      // Generating a 32 random chars long string
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      //Calling the callback passing the random name generated with the original extension name
      cb(null, `${randomName}${extname(file.originalname)}`)
    }
  })
}))
 
@ApiConsumes('multipart/form-data')
@ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { 
          type: 'string',
          format: 'binary',
        },
      },
    },
  })

async uploadFile(@Param('id') id:string,@UploadedFile('file') file: Express.Multer.File) {
  try{
      const data = await this.userService.uploadProfileImage(file,id)
  }
  catch(e){
    throw new BadRequestException({message:e.message})
  }
}




  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string,@Res() res:Response) {
    try{
    const data = await this.userService.findOne(id);
    return res.status(HttpStatus.OK).json({data})
    }
    catch(e){
      res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
    }
  }
///WishList

@Post('addToWishList')

async Wish(@Body()updateWishDto:UpdateWishDto,@Res() res:Response){

 try{
  
    const data = await this.userService.addToWishList(updateWishDto);
    return res.status(HttpStatus.OK).json({data})
    }
    catch(e){
      res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
    }


}

@Get('wishList/:id')
getWishList(@Param('id') id:string){
  return this.userService.getUserWishList(id)
}



  @Patch(':id')
 async  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@Res() res:Response) {
     try{
    const data = await this.userService.update(id,updateUserDto);
    return res.status(HttpStatus.OK).json({data})
    }
    catch(e){
      res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
    }
  }

@Patch('updatePassword/:id')
async updatePassword(@Param('id') id:string,@Body() updatePasswordDto:UpdatePasswordDto,@Res() res:Response){
 try{
    const data = await this.userService.updateUserPassword(id,updatePasswordDto);
    return res.status(HttpStatus.OK).json({data})
    }
    catch(e){
      res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
    }


}



  @Delete(':id')
 async remove(@Param('id') id: string,@Res() res:Response) {
     try{
    const data = await this.userService.remove(id);
    return res.status(HttpStatus.OK).json({data})
    }
    catch(e){
      res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
    }
  }

@Get('/email/verify')
async verify(@Query('email') email:string,@Query('emailToken') emailToken:string,@Res()res:Response )
{
try{

const data = await this.userService.verifyEmail(email,emailToken)
return res.status(HttpStatus.OK).json({data})
}
catch(e){
  return  res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}


}



}