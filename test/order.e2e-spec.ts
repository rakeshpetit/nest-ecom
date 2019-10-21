import { Product } from '../src/types/product';
import { HttpStatus } from '@nestjs/common';
import { CreateProductDTO } from '../src/product/product.dto';
import { RegisterDTO } from './../src/auth/auth.dto';
import * as mongoose from 'mongoose';
import axios from 'axios';
import * as request from 'supertest';
import { app } from './constants';

let buyerToken: string;
let sellerToken: string;
let boughtProducts: Product[];
const productBuyer: RegisterDTO = {
  username: 'productBuyer',
  password: 'password',
};
const productSeller: RegisterDTO = {
  username: 'productSeller',
  password: 'password',
  seller: true,
};
const soldProducts: CreateProductDTO[] = [
  {
    title: 'Honor 8',
    image: 'n/a',
    description: 'Huawei',
    price: 280,
  },
  {
    title: 'Galaxy S7',
    image: 'n/a',
    description: 'Samsung',
    price: 450,
  },
];

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await mongoose.connection.db.dropDatabase();
  const {
    data: { token: sellerToken },
  } = await axios.post(`${app}/auth/register`, productSeller);
  const {
    data: { token: buyerToken },
  } = await axios.post(`${app}/auth/register`, productBuyer);
  //   buyerToken = token;
  const [{ data: data1 }, { data: data2 }] = await Promise.all(
    soldProducts.map(product =>
      axios.post(`${app}/product`, product, {
        headers: { authorization: `Bearer ${sellerToken}` },
      }),
    ),
  );
  boughtProducts = [data1, data2];
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('ORDER', () => {
  it('should create order of all products', () => {});
  it('should list all orders of buyers', () => {});
  it('should create order of all products', () => {});
});
