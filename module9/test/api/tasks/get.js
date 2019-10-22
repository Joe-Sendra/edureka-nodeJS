const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/index.js');

describe('GET /tasks', () => {
    before((done) => {
        conn.connect()
        .then(() => {
            request(app).del('/tasks')
            .then((res) => done())
            .catch((err) => done(err))
            done();
        })
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
            const status = res.status;
            expect(body.length).to.equal(0);
            expect(status).to.equal(200);
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
                const status = res.status;
                expect(body.length).to.equal(1);
                expect(status).to.equal(200);
                done();
            })
        })
        .catch((err) => done(err));
    });

    it('OK, getting task using param', (done) => {
        request(app).post('/tasks')
        .send({ name: 'TASK TEST2', text: 'TEST TEXT2'})
        .then((res) => {
            request(app).get('/tasks/'+ res.body._id)
            .then((res) => {
                const body = res.body;
                const status = res.status;
                expect(body.length).to.equal(1);
                expect(body[0].name).to.equal('TASK TEST2');
                expect(status).to.equal(200);
                done();
            })
        })
        .catch((err) => done(err));
    });

    it('OK, getting task using id query param', (done) => {
        request(app).post('/tasks')
        .send({ name: 'TASK TEST3', text: 'TEST TEXT3'})
        .then((res) => {
            request(app).get('/tasks/?id='+ res.body._id)
            .then((res) => {
                const body = res.body;
                const status = res.status;
                expect(body.length).to.equal(1);
                expect(body[0].name).to.equal('TASK TEST3');
                expect(status).to.equal(200);
                done();
            })
        })
        .catch((err) => done(err));
    });

    it('Fail, task does not exist', (done) => {
        request(app).get('/tasks/doesnotexist')
        .then((res) => {
            const body = res.body;
            const status = res.status;
            expect(body.length).to.equal(0);
            expect(status).to.equal(200);
            done();
        })
        .catch((err) => done(err));
    })
    
});