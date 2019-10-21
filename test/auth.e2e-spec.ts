import { RegisterDTO, LoginDTO } from '../src/auth/auth.dto';
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';
import { app } from './constants';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('AUTH', () => {
  const user: RegisterDTO | LoginDTO = {
    username: 'username',
    password: 'password',
  };
  const seller: RegisterDTO | LoginDTO = {
    username: 'seller',
    password: 'password',
    seller: true,
  };
  let userToken: string;
  let sellerToken: string;
  it('should register user', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.username).toEqual('username');
        expect(body.password).toBeUndefined();
        expect(body.seller).toBeFalsy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should register seller', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(seller)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.username).toEqual('seller');
        expect(body.password).toBeUndefined();
        expect(body.seller).toBeTruthy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should not allow duplicate registration', () => {
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.code).toEqual(400);
        expect(body.message).toEqual('User already exists');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login user with valid credentials', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        userToken = body.token;
        expect(body.token).toBeDefined();
        expect(body.username).toEqual('username');
        expect(body.password).toBeUndefined();
        expect(body.seller).toBeFalsy();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should not login with invalid credentials', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send({ ...user, password: 'wrongPassword' })
      .expect(({ body }) => {
        expect(body.code).toEqual(401);
        expect(body.message).toEqual('Invalid credentials');
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });
  it('should login seller with valid credentials', () => {
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(seller)
      .expect(({ body }) => {
        sellerToken = body.token;
        expect(body.token).toBeDefined();
        expect(body.username).toEqual('seller');
        expect(body.password).toBeUndefined();
        expect(body.seller).toBeTruthy();
      })
      .expect(HttpStatus.CREATED);
  });
});
