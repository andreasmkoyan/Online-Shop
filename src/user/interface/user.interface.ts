import { ApiProperty } from "@nestjs/swagger";

export class UserLogin {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
}
