import { CreateOrderDTO } from './order.dto';
import { Order } from './../types/order';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Model } from 'mongoose';

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private orderModel: Model<Order>) {}

  async listOrdersByUser(userId: string): Promise<Order[]> {
    const orders = await this.orderModel
      .find({ owner: userId })
      .populate('owner')
      .populate('products.product');
    if (!orders) {
      throw new HttpException('No Orders found', HttpStatus.NO_CONTENT);
    }
    return orders;
  }
  async create(orderDTO: CreateOrderDTO, userId: string): Promise<Order> {
    const createOrder = {
      owner: userId,
      products: orderDTO.products,
    };
    const { _id } = await this.orderModel.create(createOrder);
    let order = await this.orderModel
      .findById(_id)
      .populate('owner')
      .populate('products.product');
    const totalPrice = order.products.reduce(
      (acc, product) => acc + product.quantity * product.product.price,
      0,
    );
    await order.update({ totalPrice });
    order = await this.orderModel
      .findById(_id)
      .populate('owner')
      .populate('products.product');
    return order;
  }
}
