import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
    @ApiProperty()
    quantity:number
    
    @ApiProperty()
    price:number
    
    @ApiProperty()
    product:string
    
    @ApiProperty()
    user:string
    
   
}
