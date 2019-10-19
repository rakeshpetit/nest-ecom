import { SellerGuard } from './../guards/seller.guard';
import { AuthService } from './auth.service';
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { RegisterDTO, LoginDTO } from './../auth/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../utils/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async findAll(@User() user: any) {
    return await this.userService.findAll();
  }

  @Post('login')
  async login(@Body() userDTO: LoginDTO) {
    const user = await this.userService.findByLogin(userDTO);
    const payload = {
      username: user.username,
      seller: user.seller,
    };
    const token = await this.authService.signPayload(payload);
    return { ...user, token };
  }

  @Post('register')
  async register(@Body() userDTO: RegisterDTO) {
    const user = await this.userService.create(userDTO);
    const payload = {
      username: user.username,
      seller: user.seller,
    };
    const token = await this.authService.signPayload(payload);
    return { ...user, token };
  }
}
