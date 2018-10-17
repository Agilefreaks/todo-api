const request = require('supertest');
const app = require('../../../app');

var todos = require('../../../repository/todosRepository');

describe('GET', function() {
    describe('/v1/todos', function() {
        it('retrieves a list of todos', function(done) {
            var todosList = todos.getTodos();
            request(app)
                .get('/v1/todos')
                .set('Accept', 'application/vnd.api+json')
                .expect('Content-Type', 'application/vnd.api+json; charset=utf-8')
                .expect(todosList)
                .expect(200, done)
        });
    });
});
