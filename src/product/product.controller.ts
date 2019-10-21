import { User } from './../utils/user.decorator';
import { SellerGuard } from './../guards/seller.guard';
import { AuthGuard } from '@nestjs/passport';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { ProductService } from './product.service';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { User as UserDocument } from '../types/user';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll() {
    return await this.productService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async create(@Body() product: CreateProductDTO, @User() user: UserDocument) {
    return await this.productService.create(product, user);
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async update(@Param('id') id: string, @Body() product: UpdateProductDTO) {
    return await this.productService.update(id, product);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'), SellerGuard)
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
