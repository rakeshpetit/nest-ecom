import { User } from './../utils/user.decorator';
import { User as UserDocument } from './../types/user';
import { AuthGuard } from '@nestjs/passport';
import { CreateOrderDTO } from './order.dto';
import { Order } from './../types/order';
import { OrderService } from './order.service';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async listOrders(@User() { id }: UserDocument): Promise<Order[]> {
    return await this.orderService.listOrdersByUser(id);
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(
    @User() { id }: UserDocument,
    @Body() order: CreateOrderDTO,
  ): Promise<Order> {
    return await this.orderService.create(order, id);
  }
}
