const expect = require('chai').expect;
const request = require('supertest');

const app = require('../../../app.js');
const conn = require('../../../db/index.js');

describe('DELETE /tasks', () => {
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

    it('OK, delete task using param', (done) => {
        request(app).post('/tasks')
        .send({ name: 'TASK TEST', text: 'TEST TEXT'})
        .then((res) => {
            request(app).del('/tasks/' + res.body._id)
            .then((res) => {
                const body = res.body;                
                const status = res.status;
                expect(body.n).to.equal(1);
                expect(body.ok).to.equal(1);
                expect(body.deletedCount).to.equal(1);
                expect(status).to.equal(200);
                done();
            })
        })
        .catch((err) => done(err));
    });

    it('OK, delete task using id query param', (done) => {
        request(app).post('/tasks')
        .send({ name: 'TASK TEST2', text: 'TEST TEXT2'})
        .then((res) => {
            request(app).del('/tasks/?id=' + res.body._id)
            .then((res) => {
                const body = res.body;                
                const status = res.status;
                expect(body.n).to.equal(1);
                expect(body.ok).to.equal(1);
                expect(body.deletedCount).to.equal(1);
                expect(status).to.equal(200);
                done();
            })
        })
        .catch((err) => done(err));
    });

    it('Fail, task does not exist', (done) => {
            request(app).del('/tasks/doesnotexist')
            .then((res) => {
                const body = res.body;                
                const status = res.status;
                expect(body.n).to.equal(0);
                expect(body.ok).to.equal(1);
                expect(body.deletedCount).to.equal(0);
                expect(status).to.equal(200);
                done();
            })    
        .catch((err) => done(err));
    })
    
});