const request = require('supertest');
const app = require('../../../app');

let todosRepository = require('../../../repository/todosRepository');
let JSONAPISerializer = require('jsonapi-serializer').Serializer;

describe('GET', function () {
    describe('/v1/todos', function () {
        it('retrieves a list of todos', function (done) {
            request(app)
                .get('/v1/todos')
                .set('Accept', 'application/vnd.api+json')
                .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')

                .expect(200, done)
        });
    });
});