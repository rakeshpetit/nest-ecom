import { RegisterDTO } from '../src/auth/auth.dto';
import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpStatus } from '@nestjs/common';
import * as mongoose from 'mongoose';

const app = 'http://localhost:3000';

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async done => {
  await mongoose.disconnect(done);
});

describe('ROOT', () => {
  it('/ (GET)', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect({ text: 'Hello World!' });
  });
});

describe('AUTH', () => {
  it('should register', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
    };
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should not allow duplicate registration', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
    };
    return request(app)
      .post('/auth/register')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.statusCode).toEqual(400);
        expect(body.message).toEqual('User already exists');
      })
      .expect(HttpStatus.BAD_REQUEST);
  });

  it('should login with valid credentials', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'password',
    };
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.token).toBeDefined();
        expect(body.user.username).toEqual('username');
        expect(body.user.password).toBeUndefined();
      })
      .expect(HttpStatus.CREATED);
  });

  it('should not login with invalid credentials', () => {
    const user: RegisterDTO = {
      username: 'username',
      password: 'wrongpassword',
    };
    return request(app)
      .post('/auth/login')
      .set('Accept', 'application/json')
      .send(user)
      .expect(({ body }) => {
        expect(body.statusCode).toEqual(401);
        expect(body.message).toEqual('Invalid credentials');
      })
      .expect(HttpStatus.UNAUTHORIZED);
  });
});
