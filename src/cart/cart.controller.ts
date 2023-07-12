import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
 async  create(@Body() createCartDto: CreateCartDto,@Res() res:Response) {
     try{
  const data = await this.cartService.create(createCartDto);
  return res.status(HttpStatus.CREATED).json({data})
}
catch(e){
  return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
 async findOne(@Param('id') id: string,@Res() res:Response) {
    try{
    const data = await this.cartService.findOne(id);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
  }
  }

  @Patch(':id')
 async update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto,@Res() res:Response) {
     try{
    const data = await this.cartService.update(id,updateCartDto);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
     return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
  }
  }

  @Delete(':id')
 async remove(@Param('id') id: string,@Res() res:Response) {
     try{
    const data = await this.cartService.remove(id);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  }
}
