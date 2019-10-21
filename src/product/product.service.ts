import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/types/Product';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().populate('owner');
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id).populate('owner');
  }

  async create(productDTO: CreateProductDTO): Promise<Product> {
    const product = await this.productModel.create(productDTO);
    return await product.save();
  }

  async update(id: string, productDTO: UpdateProductDTO): Promise<Product> {
    const product = await this.productModel.findById(id);
    return await product.update(productDTO);
  }

  async delete(id: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    return await product.remove();
  }
}
