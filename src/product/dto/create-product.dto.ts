import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    title:string
     
    @ApiProperty()
     body:string
      
    @ApiProperty()
      picUrl:string[]

    @ApiProperty()
       price:number
        
    @ApiProperty()
        count:number
    
    @ApiProperty()
        user:string
    
     @ApiProperty()
        category:string
    

}
