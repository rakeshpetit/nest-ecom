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
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  async listAll() {
    return await this.productService.findAll();
  }

  @Post()
  async create(@Body() product: CreateProductDTO) {
    return await this.productService.create(product);
  }

  @Get(':id')
  async read(@Param('id') id: string) {
    return await this.productService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() product: UpdateProductDTO) {
    return await this.productService.update(id, product);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.productService.delete(id);
  }
}
