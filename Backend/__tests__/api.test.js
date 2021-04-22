// process.env.NODE_ENV = 'test';
const mongoose = require('mongoose');

const app = require('../app');
const db = require('../database/db-connection');
const request = require('supertest');
const { seedFunction } = require('../database/seed');
const { beforeEach, expect } = require('@jest/globals');

beforeEach((done) => {
  seedFunction().then(() => {
    console.log('beforeEach');
    done();
  });
});

afterAll(() => {
  console.log('afterAll');
});

describe('Name of the group', () => {
  test('should ', () => {
    return request(app)
      .get('/api/users/6080273f57b6c0468732f97f')
      .expect(200)
      .then((res) => {
        expect(res.body.length).toEqual(5);
      });
  });
});
