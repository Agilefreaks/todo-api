const JSONAPIDeserializer = require("jsonapi-serializer").Deserializer;
const httpMocks = require("node-mocks-http");
const chai = require("chai");
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const Todo = require('../../model/todosModel');
const todosController = require('../../controllers/todosController');

describe("TodosController", function () {
    describe("getTodos", function () {
        getOutput = function (todos) {
            let repository = {};
            repository.getTodos = () => todos;

            let req = httpMocks.createRequest({
                method: 'GET',
                url: '/v1/todos'
            });

            let res = httpMocks.createResponse();

            todosController.getTodos(repository)(req, res);

            let output = res._getData();
            return output
        }

        describe("when the list contains todos", function () {
            it("returns the list of todos", function () {

                let todos = [
                    new Todo(1, "Walk dog", true),
                    new Todo(2, "World domination", false)
                ];

                let output = getOutput(todos);

                expect(output).to.deep.equal({
                    data: [
                        {
                            type: "todo",
                            id: 1,
                            attributes: {
                                text: "Walk dog",
                                done: true
                            }
                        },
                        {
                            type: "todo",
                            id: 2,
                            attributes: {
                                text: "World domination",
                                done: false
                            }
                        }
                    ]
                });
            });
        });

        describe("when the list contains no todos", function () {
            it("returns an empty list", function () {
                let output = getOutput([]);
                expect(output).to.deep.equal({
                    data: []
                });
            });
        });
    });
});