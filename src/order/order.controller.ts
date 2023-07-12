import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, NotFoundException } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
async  create(@Body() createOrderDto: CreateOrderDto,@Res() res:Response) {
   try{
  const data = await this.orderService.create(createOrderDto);
  return res.status(HttpStatus.CREATED).json({data})
}
catch(e){
  return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
async  findOne(@Param('id') id: string,@Res() res:Response) {
    try{
    const data = await this.orderService.findOne(id);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
  }
}
  @Patch(':id')
async  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto,@Res() res:Response) {
     try{
    const data = await this.orderService.update(id,updateOrderDto);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
     return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
  }

}
  @Delete(':id')
async  remove(@Param('id') id: string,@Res() res:Response) {
      try{
    const data = await this.orderService.remove(id);
     return res.status(HttpStatus.OK).json({data})
  }
  catch(e){
    return res.status(HttpStatus.BAD_REQUEST).json({message:e.message})
}
  }
}
