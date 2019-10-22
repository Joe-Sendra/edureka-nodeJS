const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/index.js');

describe('UPDATE /tasks', () => {
    before((done) => {
        conn.connect()
        .then(() => done())
        .catch((err) => done(err));
    })

    after((done) => {
        conn.close()
        .then(() => done())
        .catch((err) => done(err));
    })

    it('OK, patch task name works', (done) => {
        request(app).post('/tasks')
        .send({ name: 'UPDATE TASK', text: 'TESTING TASK TEST'})
        .then((res) => {
            const body = res.body;
            const status = res.status;
            expect(status).to.equal(201);
            expect(body.name).to.equal('UPDATE TASK');
            request(app).patch('/tasks/' + body._id)
            .send({ name: 'UPDATED TASK'})
            .then((res) => {
                const body = res.body;
                const status = res.status;
                expect(body.n).to.equal(1);
                expect(body.nModified).to.equal(1);
                expect(body.ok).to.equal(1);
                expect(status).to.equal(200);
                done();
            })
        })
        .catch((err) => done(err));
    });

    it('Fail, task can not add new field only update existing ones', (done) => {
        request(app).post('/tasks')
        .send({ name: 'UPDATE TASK2', text: 'TESTING TASK TEST2'})
        .then((res) => {
            const body = res.body;
            const status = res.status;
            expect(status).to.equal(201);
            expect(body.name).to.equal('UPDATE TASK2');
            request(app).patch('/tasks/' + body._id)
            .send({ newField: 'UPDATED TASK NEW FIELD'})
            .then((res) => {
                const body = res.body;
                const status = res.status;
                expect(body.n).to.equal(0);
                expect(body.nModified).to.equal(0);
                expect(body.ok).to.equal(0);
                expect(status).to.equal(401);
                done();
            })
        })
        .catch((err) => done(err));
    });

});