import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('comment')
@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService,) {}

  @Post()
 async create(@Body() createCommentDto: CreateCommentDto,@Res() res:Response) {
  try{

   const data =  this.commentService.create(createCommentDto);
    return res.status(HttpStatus.CREATED).json({data})
  }
    
    catch(e){
      return res.status(HttpStatus.BAD_REQUEST).json()
    }
  }

  @Get()
  findAll() {
    return this.commentService.findAll();
  }

  @Get(':id')
async  findOne(@Param('id') id: string,@Res() res:Response) {
    try{
    const data = await this.commentService.findOne(id);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
  }
}
  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto,@Res() res:Response) {
      try{
    const data = await this.commentService.update(id,updateCommentDto);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  }

  @Delete(':id')
async  remove(@Param('id') id: string,@Res() res:Response) {
      try{
    const data = await this.commentService.remove(id);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  }
}
