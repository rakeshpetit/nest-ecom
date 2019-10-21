import { SharedModule } from './../shared/shared.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './../models/order.schema';
import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    SharedModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
