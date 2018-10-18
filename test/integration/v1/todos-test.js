const request = require('supertest');
const app = require('../../../app');

let todosRepository = require('../../../repository/todosRepository');
let JSONAPISerializer = require('jsonapi-serializer').Serializer;

describe('GET', function () {
    describe('/v1/todos', function () {

        let todosSerializer = new JSONAPISerializer('todos', {
            attributes: ['text', 'checked']
        });
        let data = todosSerializer.serialize(todosRepository.getTodos());
        it('retrieves a list of todos', function (done) {
            request(app)
                .get('/v1/todos')
                .set('Accept', 'application/vnd.api+json')
                .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
                .expect(data)
                .expect(200, done)
        });
    });
});