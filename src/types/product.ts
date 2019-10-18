import { User } from './user';
import { Document } from 'mongoose';

export interface Product extends Document {
  owner: User;
  title: string;
  description: string;
  image: string;
  price: number;
  created: Date;
}
