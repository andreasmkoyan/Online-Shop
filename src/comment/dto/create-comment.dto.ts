import { ApiProperty } from "@nestjs/swagger";

export class CreateCommentDto {
    @ApiProperty()
    text:string
    
    @ApiProperty()
    product:string
    
    @ApiProperty()
    user:string
}
