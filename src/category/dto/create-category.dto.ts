import { ApiProperty } from "@nestjs/swagger";

export class CreateCategoryDto {
    @ApiProperty()
    name:string
     
    @ApiProperty()
    picUrl:string
      
     @ApiProperty()
     user:string
}
