import * as request from 'supertest';
import { app } from './constants';

describe('ROOT', () => {
  it('/ (GET)', () => {
    return request(app)
      .get('/')
      .expect(200)
      .expect({ text: 'Hello World!' });
  });
});
