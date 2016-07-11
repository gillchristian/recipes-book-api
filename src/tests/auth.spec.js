require('should')

const request = require('supertest')
const app = require('./helpers/mock.app')
const config = require('../config/config')

// eslint-disable-next-line
describe('Authentication.', function () {
  this.timeout(5000)

  describe('/api/authenticate', () => {
    describe('POST /', () => {
      it('should try to authenticate with no username', done => {
        const user = { password: 'asd' }
        request(app)
          .post('/api/authenticate')
          .set('Accept', 'application/json')
          .send(user)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(401)
            res.error.text.should.eql('Authentication failed. Username not provided.')
            // eslint-disable-next-line no-unused-expressions
            res.should.be.json
            done()
          })
      })
      it('should try to authenticate with no password', done => {
        const user = { username: config.ADMIN_USERNAME }
        request(app)
          .post('/api/authenticate')
          .set('Accept', 'application/json')
          .send(user)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(401)
            res.error.text.should.eql('Authentication failed. Password not provided.')
            // eslint-disable-next-line no-unused-expressions
            res.should.be.json
            done()
          })
      })
      it('should try to authenticate with wrong username', done => {
        const user = { username: 'wrongUsername', password: config.ADMIN_PASSWORD }
        request(app)
          .post('/api/authenticate')
          .set('Accept', 'application/json')
          .send(user)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(401)
            res.error.text.should.eql('Authentication failed. Invalid username.')
            // eslint-disable-next-line no-unused-expressions
            res.should.be.json
            done()
          })
      })
      it('should try to authenticate with wrong password', done => {
        const user = { username: config.ADMIN_USERNAME, password: 'wrongPassword' }
        request(app)
          .post('/api/authenticate')
          .set('Accept', 'application/json')
          .send(user)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(401)
            res.error.text.should.eql('Authentication failed. Invalid password.')
            // eslint-disable-next-line no-unused-expressions
            res.should.be.json
            done()
          })
      })
      it('should authenticate OK.', done => {
        const user = { username: config.ADMIN_USERNAME, password: config.ADMIN_PASSWORD }
        request(app)
          .post('/api/authenticate')
          .set('Accept', 'application/json')
          .send(user)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(200)
            // eslint-disable-next-line no-unused-expressions
            res.should.be.json
            done()
          })
      })
    })
  })
})
