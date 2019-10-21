import { HttpStatus } from '@nestjs/common';
import { CreateProductDTO } from './../dist/product/product.dto.d';
import { RegisterDTO } from './../src/auth/auth.dto';
import * as mongoose from 'mongoose';
import axios from 'axios';
import * as request from 'supertest';
import { app } from './constants';

let sellerToken: string;
const productSeller: RegisterDTO = {
  username: 'productSeller',
  password: 'password',
  seller: true,
};
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await mongoose.connection.db.dropDatabase();
  const {
    data: { token },
  } = await axios.post(`${app}/auth/register`, productSeller);
  sellerToken = token;
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('PRODUCT', () => {
  let productId = null;
  const product: CreateProductDTO = {
    title: 'phone',
    description: 'Xiaomi Mi6',
    image: 'n/a',
    price: 225,
  };
  it('should list all products', () => {
    return request(app)
      .get('/product')
      .expect(200);
  });
  it('should list my products', () => {
    return request(app)
      .get('/product/mine')
      .set('Authorization', `Bearer ${sellerToken}`)
      .expect(200);
  });
  it('should create product', () => {
    return request(app)
      .post('/product')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .send(product)
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        productId = body._id;
        expect(body.title).toEqual(product.title);
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.image).toEqual(product.image);
        expect(body.owner.username).toEqual(productSeller.username);
      })
      .expect(HttpStatus.CREATED);
  });
  it('should read product', () => {
    return request(app)
      .get(`/product/${productId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .send(product)
      .expect(({ body }) => {
        expect(body._id).toEqual(productId);
        expect(body.title).toEqual(product.title);
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.image).toEqual(product.image);
        expect(body.owner.username).toEqual(productSeller.username);
      })
      .expect(200);
  });
  it('should update product', () => {
    return request(app)
      .put(`/product/${productId}`)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${sellerToken}`)
      .send({ title: 'New tablet' })
      .expect(({ body }) => {
        expect(body._id).toBeDefined();
        productId = body._id;
        expect(body.title).not.toEqual(product.title);
        expect(body.description).toEqual(product.description);
        expect(body.price).toEqual(product.price);
        expect(body.image).toEqual(product.image);
        expect(body.owner.username).toEqual(productSeller.username);
      })
      .expect(200);
  });
  it('should delete product', async () => {
    await axios.delete(`${app}/product/${productId}`, {
      headers: { Authorization: `Bearer ${sellerToken}` },
    });
    return request(app)
      .get(`/product/${productId}`)
      .expect(HttpStatus.NO_CONTENT);
  });
});
