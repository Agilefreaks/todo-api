const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;
const httpMocks = require("node-mocks-http");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const todosController = require('../../controllers/todosController');

describe("TodosController", function () {
    describe("getTodos", function () {
        getOutput = function(testRepository) {
            let stub = sinon.stub();
            stub.returns(testRepository);

            let repository = {};
            repository.getTodos = stub;

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
                let repository = [
                    { id: 1, text: 'Study jutsu', checked: true },
                    { id: 2, text: 'Take pictures of Mona Lisa', checked: true },
                    { id: 3, text: 'Fix bug #5127', checked: true },
                    { id: 4, text: 'World domination', checked: true }
                ];

                let output = getOutput(repository);

                expect(output).to.eventually.deep.equal(repository);
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
