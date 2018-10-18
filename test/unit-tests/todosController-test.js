const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;
const httpMocks = require("node-mocks-http");
const chai = require("chai");
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const todosController = require('../../controllers/todosController');

describe("TodosController", function () {
    describe("getTodos", function () {
        getOutput = function(todos) {
            let repository = {};
            repository.getTodos = () => todos;

            let req = httpMocks.createRequest({
                method: 'GET',
                url: '/v1/todos'
            });

            let res = httpMocks.createResponse();

            todosController.getTodos(repository)(req, res);

            let output = res._getData();
            return output = new JSONAPIDeserializer().deserialize(output)
        }

        describe("when the list contains todos", function () { 
            it("returns the list of todos", function () {
                let todos = [
                    { id: 1, text: 'Study jutsu', done: true },
                    { id: 2, text: 'Take pictures of Mona Lisa', done: false }
                ];

                let output = getOutput(todos);

                expect(output).to.eventually.deep.equal(todos);
            });
        });

        describe("when the list contains no todos", function () {
            it("returns an empty list", function () {
                let output = getOutput([]);
                expect(output).to.eventually.be.empty;
            });
        });
    });
});
