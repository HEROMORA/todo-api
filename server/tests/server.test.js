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
    text: 'second test todo'
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