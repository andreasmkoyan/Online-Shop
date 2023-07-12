import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmailOrUsername(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      // const { password, emailToken, ...us } = user;
      return user;
    }

    return null;
  }

  async login(user: any) {
    console.log(user);
    
    const payload = {
      username: user.username,
      sub: user._id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };

  }

}
