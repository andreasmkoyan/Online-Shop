import { ApiProperty } from "@nestjs/swagger";

export class CreateCartDto {
    @ApiProperty()
    quantity:number
    
    @ApiProperty()
    product:string
    
    @ApiProperty()
    user:string
}
