import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiProperty, ApiTags } from '@nestjs/swagger';
import { UserLogin } from 'src/user/interface/user.interface';
import { Role } from 'src/user/role/enum.role';
import { HasRoles } from 'src/user/role/roles.decorater';
import { RolesGuard } from './role';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req, @Body() user: UserLogin) {
    // return req.user;
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  getProfile(@Request() req) {
    return req.user;
  }


  
  @HasRoles(Role.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.USER)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Get('user')
  onlyUser(@Request() req) {
    return req.user;
  }
}
