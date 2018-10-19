const httpMocks = require("node-mocks-http");
const chai = require("chai");
const expect = chai.expect;
chai.use(require('chai-as-promised'));

const Todo = require('../../model/todosModel');
const todosController = require('../../controllers/todosController');

describe("TodosController", () => {
    describe("getTodos", () => {
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

        describe("when the list contains todos", () => {
            it("returns the list of todos", () => {

                let todos = [
                    new Todo(1, "Walk dog", true),
                    new Todo(2, "World domination", false)
                ];

                let output = getOutput(todos);

                expect(output).to.deep.equal({
                    data: [{
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

        describe("when the list contains no todos", () => {
            it("returns an empty list", () => {
                let output = getOutput([]);
                expect(output).to.deep.equal({
                    data: []
                });
            });
        });
    });

    describe("addTodos", () => {
        var req, res, repository;

        before(() => {
            repository = {};
            repository.create = (todo) => 
                new Todo(42, todo.text, todo.done);

            req = httpMocks.createRequest({
                method: 'POST',
                url: '/v1/todos'
            });

            req.body = {
                "data": [{
                    "attributes": {
                        "done": true,
                        "text": "Walk dog"
                    },
                    "id": 42,
                    "type": "todo"
                }
            ]}

            res = httpMocks.createResponse();
        });

        it("will return response code 201", async () => {
            await todosController.addTodo(repository)(req, res);
            expect(res.statusCode).to.equal(201);
        });

        it("will use the required content-type", () => {
            todosController.addTodo(repository)(req, res);
            expect(res.header("Content-Type")).to.equal("application/vnd.api+json");
        })

        it("will set location header to the todo path", () => {
            todosController.addTodo(repository)(req, res);
            expect(res.header("Location")).to.equal("v1/todos/42");
        });

        it("will return the created todo", () => {
            todosController.addTodo(repository)(req, res);
            expect(res._getData()).to.deep.equal(req.body);
        });
    });
});
