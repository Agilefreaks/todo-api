const request = require('supertest');
const app = require('../app');

describe('GET v1/status', function() {
    it('responds with status code 204', function(done) {
        request(app)
            .get('/v1/status')
            .expect(204, done);
    });
});
