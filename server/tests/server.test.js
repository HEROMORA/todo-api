const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
    _id: new ObjectID(),
    text: 'first test todo'
}, {
    _id: new ObjectID(),
    text: 'second test todo',
    completed: true,
    completedAt: 333
}];

beforeEach((done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => done());
})

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'test todo text';

        request(app)
        .post('/todos')
        .send({text})
        .expect(200)
        .expect((res) => {
            //CHECKING IF THE TEXT IS POSTED CORRECTLY
            expect(res.body.text).toBe(text);
        })
        .end((err, res) => {
            //CHECKING IF THERE WAS ERROR IN THE REQUEST
            if (err) {
                return done(err);
            }
            
            //CHECKING THE DATABASE
            Todo.find({text}).then((todos) => {
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => done(e))
        });
    });

    it('should not create todo with invalid body data', (done) => {
        var text = '';

        request(app)
        .post('/todos')
        .send({text})
        .end((err, res) => {
            if (err) {
                return done(err);
            }
            Todo.find().then((todos) => {
                expect(todos.length).toBe(2);
                done();
            }).catch(e => done(e));
        });
    });
});

describe('GET /todos', () => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res) => {
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});

describe('GET /todos/:id', () => {

    // MAKES SURE PASSING A CORRECT ID YOU GETS THE TODO
    it('should return todo doc', (done) => {
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo.text).toBe(todos[0].text);
        })
        .end(done);
    });

    it('should return a 404 if todo not found', (done) => {
        let id = new ObjectID().toHexString;
        request(app)
        .get(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    it('should return a 404 for non-objects IDs', (done) => {
        request(app)
        .get('/todos/123')
        .expect(404)
        .end(done);
    });
});

describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        let hexId = todos[1]._id.toHexString();
        request(app)
        .delete(`/todos/${hexId}`)
        .expect(200)
        .expect((res) => {
            expect(res.body.todo._id).toBe(hexId)
        })
        .end((err, res) => {
            if (err) {
                return done(err);
            }

            Todo.findById(hexId).then((todo) => {
                expect(todo).toBeFalsy();
                done();
            }).catch(e => done(e));
        });

    });

    it('should return 404 if todo not found', (done) => {
        let id = new ObjectID();
        request(app)
        .delete(`/todos/${id}`)
        .expect(404)
        .end(done);
    });

    it('should return 404 if object ID is invalid', (done) => {
        request(app)
        .delete('/todos/123')
        .expect(404)
        .end(done);
    })
});

describe('PATCH /todos/:id', () => {

    let newText = 'this is updated text'

    it('should update the todo', (done) => {
        let id = todos[0]._id;        
        request(app)
        .patch(`/todos/${id}`)
        .send({
            completed: true,
            text: newText
        })
        .expect(200)
        .expect((res) => {
            let updatedTodo = res.body.todo;

            expect(updatedTodo.text).toBe(newText);
            expect(updatedTodo.completed).toBe(true);
            expect(typeof updatedTodo.completedAt).toBe('number');
        })
        .end(done);        
    });

    it('should clear completedAt when todo is not completed', (done) => {
        let id = todos[1]._id;
        request(app)
        .patch(`/todos/${id}`)
        .send({
            completed: false,
            text: newText
        })
        .expect(200)
        .expect((res) => {
            let updatedTodo = res.body.todo;
            expect(updatedTodo.text).toBe(newText);
            expect(updatedTodo.completed).toBe(false);
            expect(updatedTodo.completedAt).toBeNull();
        })
        .end(done);
    });
});