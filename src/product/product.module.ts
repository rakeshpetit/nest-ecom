import { SharedModule } from './../shared/shared.module';
import { ProductSchema } from './../models/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    SharedModule,
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
