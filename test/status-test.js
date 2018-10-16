const request = require('supertest');
const app = require('../app');

var todos = require('../mockup/todos');

describe('GET', function() {
    describe('/v1/status', function() {
        it('responds with status code 204', function(done) {
            request(app)
                .get('/v1/status')
                .expect(204, done);
        });
    });

    describe('/v1/todos', function() {
        it('retrieves a list of todos', function(done) {
            request(app)
                .get('/v1/todos')
                .set('Accept', 'application/vnd.api+json')
                .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
                .expect(todos)
                .expect(200, done)
        });
    });
});
