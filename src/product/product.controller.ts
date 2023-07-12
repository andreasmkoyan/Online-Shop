import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
 async create(@Body() createProductDto: CreateProductDto,@Res() res:Response) {
try{
  const data = await this.productService.create(createProductDto);
  return res.status(HttpStatus.CREATED).json({data})
}
catch(e){
  return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
async  findOne(@Param('id') id: string,@Res() res:Response) {
  try{
    const data = await this.productService.findOne(id);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  
   
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Res() res:Response) {
    try{
    const data = await this.productService.update(id,updateProductDto);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  
  }

  @Delete(':id')
 async remove(@Param('id') id: string,@Res() res:Response) {
     try{
    const data = await this.productService.remove(id);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  }
}
