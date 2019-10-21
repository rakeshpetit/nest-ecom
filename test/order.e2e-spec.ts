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
    data: { token: sellerTokenDestr },
  } = await axios.post(`${app}/auth/register`, productSeller);
  const {
    data: { token: buyerTokenDestr },
  } = await axios.post(`${app}/auth/register`, productBuyer);
  buyerToken = buyerTokenDestr;
  sellerToken = sellerTokenDestr;
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
  it('should create order of all products', () => {
    const orderDTO = {
      products: boughtProducts.map(product => ({
        product: product._id,
        quantity: 1,
      })),
    };
    return request(app)
      .post('/order')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${buyerToken}`)
      .send(orderDTO)
      .expect(({ body }) => {
        expect(body.owner.username).toEqual(productBuyer.username);
        expect(body.products.length).toEqual(boughtProducts.length);
        expect(
          boughtProducts
            .map(product => product._id)
            .includes(body.products[0]._id),
        ).toBeTruthy();
        expect(body.totalPrice).toEqual(
          boughtProducts.reduce((acc, product) => acc + product.price, 0),
        );
      })
      .expect(201);
  });
  it('should list all orders of buyers', () => {
    return request(app)
      .get('/order')
      .set('Authorization', `Bearer ${buyerToken}`)
      .expect(({ body }) => {
        expect(body.length).toEqual(1);
        expect(body[0].products.length).toEqual(boughtProducts.length);
        expect(
          boughtProducts
            .map(product => product._id)
            .includes(body[0].products[0]._id),
        ).toBeTruthy();
      })
      .expect(200);
  });
  // it('should create order of all products', () => {});
});
