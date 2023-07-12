import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
 async create(@Body() createCategoryDto: CreateCategoryDto,@Res() res:Response) {
    try{
  const data = await this.categoryService.create(createCategoryDto);
  return res.status(HttpStatus.CREATED).json({data})
}
catch(e){
  return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  }

  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Get(':id')
async  findOne(@Param('id') id: string,@Res() res:Response) {
    try{
      const data = await this.categoryService.findOne(id);
     return  res.status(HttpStatus.OK).json({data})
    }
    catch(e){
      return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
