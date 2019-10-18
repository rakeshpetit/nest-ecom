import { Document } from 'mongoose';
import { Product } from './Product';
import { User } from './user';

interface ProductOrder {
  product: Product;
  quantity: number;
}

export interface Order extends Document {
  owner: User;
  totalPrice: number;
  products: ProductOrder[];
  created: Date;
}
