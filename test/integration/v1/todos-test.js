const request = require('supertest');
const app = require('../../../app');

describe('GET', () => {
    describe('/v1/todos', () => {
        it('retrieves a list of todos', function (done) {
            request(app)
                .get('/v1/todos')
                .set('Accept', 'application/vnd.api+json')
                .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
                .expect(200, done)
        });
    });
});