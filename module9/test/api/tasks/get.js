const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/index.js');

describe('GET /tasks', () => {
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

    it('OK, getting tasks has no tasks', (done) => {
        request(app).get('/tasks')
        .then((res) => {
            const body = res.body;
            expect(body.length).to.equal(0);
            done();
        })
        .catch((err) => done(err));
    });

    it('OK, getting tasks has 1 task', (done) => {
        request(app).post('/tasks')
        .send({ name: 'TASK TEST', text: 'TEST TEXT'})
        .then((res) => {
            request(app).get('/tasks')
            .then((res) => {
                const body = res.body;
                expect(body.length).to.equal(1);
                done();
            })
        })
        .catch((err) => done(err));
    });

});