import { User } from './../types/user';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/types/Product';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productModel.find().populate('owner');
  }

  async findByOwner(userId: string): Promise<Product[]> {
    return await this.productModel.find({ ownder: userId }).populate('owner');
  }

  async findOne(id: string): Promise<Product> {
    return await this.productModel.findById(id).populate('owner');
  }

  async create(productDTO: CreateProductDTO, user: User): Promise<Product> {
    const product = await this.productModel.create({
      ...productDTO,
      owner: user,
    });
    await product.save();
    return product.populate('owner');
  }

  async update(
    id: string,
    productDTO: UpdateProductDTO,
    userId: string,
  ): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (userId !== product.owner.toString()) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return await product.update(productDTO).populate('owner');
  }

  async delete(id: string, userId: string): Promise<Product> {
    const product = await this.productModel.findById(id);
    if (userId !== product.owner.toString()) {
      throw new HttpException(
        'You do not own this product',
        HttpStatus.UNAUTHORIZED,
      );
    }
    await product.remove();
    return product.populate('owner');
  }
}
