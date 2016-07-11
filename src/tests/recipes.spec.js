require('should')

const request = require('supertest')
const app = require('./helpers/mock.app')
const config = require('../config/config')
let token = ''
const aRecipe = require('./helpers/newRecipe')()
const newRecipe = aRecipe
const updatedRecipe = Object.assign({}, aRecipe)
updatedRecipe.idName = updatedRecipe.name.toLowerCase().replace(/ /g, '-').replace(/\./g, '')

// eslint-disable-next-line
describe('Recipes.', function () {
  this.timeout(5000)

  describe('/api/recipes', () => {
    before((done) => {
      request(app)
        .post('/api/authenticate')
        .set('Accept', 'application/x-www-form-urlencoded')
        .send({ username: config.ADMIN_USERNAME, password: config.ADMIN_PASSWORD })
        .end((err, res) => {
          token = res.text
          done()
        })
    })
    describe('POST /', () => {
      it('should create a new Recipe', done => {
        request(app)
          .post('/api/recipes')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(newRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(201)
            newRecipe.idName = res.body.idName
            done()
          })
      })

      it('should try to create a duplicated Recipe', done => {
        request(app)
          .post('/api/recipes')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(newRecipe)
          .end((err, res) => {
            res.status.should.eql(500)
            done()
          })
      })

      it('should try to create a new Recipe with no token', done => {
        request(app)
          .post('/api/recipes')
          .set('Accept', 'application/json')
          .send(newRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(401)
            done()
          })
      })

      it('should try to create a new Recipe with an invalid token', done => {
        request(app)
          .post('/api/recipes')
          .set('Accept', 'application/json')
          .set('Authorization', '111111111111111.11111111111111111.1111111111')
          .send(newRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(401)
            done()
          })
      })
    })

    describe('GET /', () => {
      it('should find all recipes', done => {
        request(app)
          .get('/api/recipes')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            // eslint-disable-next-line no-underscore-dangle
            newRecipe._id = res.body[0]._id
            res.body[0].name.should.eql(newRecipe.name)
            res.body[0].ingredients.should.eql(newRecipe.ingredients)
            res.body[0].instructions.should.eql(newRecipe.instructions)
            res.status.should.eql(200)
            done()
          })
      })
    })

    describe('GET /:id', () => {
      it('should find one recipe by id', done => {
        request(app)
          // eslint-disable-next-line no-underscore-dangle
          .get(`/api/recipes/${newRecipe._id}`)
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.body.name.should.eql(newRecipe.name)
            res.body.ingredients.should.eql(newRecipe.ingredients)
            res.body.instructions.should.eql(newRecipe.instructions)
            res.status.should.eql(200)
            done()
          })
      })

      it('should not find one recipe by wrong id', done => {
        request(app)
          .get('/api/recipes/111111111111111111111111')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(404)
            done()
          })
      })
    })

    describe('GET /:idName', () => {
      it('should find one recipe by idName', done => {
        request(app)
          .get(`/api/recipes/${newRecipe.idName}`)
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.body.name.should.eql(newRecipe.name)
            res.body.ingredients.should.eql(newRecipe.ingredients)
            res.body.instructions.should.eql(newRecipe.instructions)
            res.status.should.eql(200)
            done()
          })
      })

      it('should not find one recipe by wrong idName', done => {
        request(app)
          .get('/api/recipes/some-name-here')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(404)
            done()
          })
      })
    })

    describe('PUT /:id', () => {
      it('should update a recipe', done => {
        updatedRecipe.name = 'New Name'
        request(app)
          // eslint-disable-next-line no-underscore-dangle
          .put(`/api/recipes/${newRecipe._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(updatedRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            // eslint-disable-next-line no-underscore-dangle
            newRecipe._id = res.body._id
            res.body.name.should.eql(updatedRecipe.name)
            res.body.ingredients.should.eql(newRecipe.ingredients)
            res.body.instructions.should.eql(newRecipe.instructions)
            res.status.should.eql(200)
            done()
          })
      })

      it('should try to delete an invalid recipe', done => {
        // eslint-disable-next-line no-underscore-dangle
        updatedRecipe._id = '111111111111111111111111'
        request(app)
          // eslint-disable-next-line no-underscore-dangle
          .put(`/api/recipes/${updatedRecipe._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(updatedRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(404)
            done()
          })
      })
    })

    describe('DELETE /:id', () => {
      it('should delete a recipe', done => {
        request(app)
          // eslint-disable-next-line no-underscore-dangle
          .delete(`/api/recipes/${newRecipe._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(204)
            done()
          })
      })
    })

    describe('DELETE /:id', () => {
      it('should try to delete an invalid recipe', done => {
        request(app)
          // eslint-disable-next-line no-underscore-dangle
          .delete(`/api/recipes/${newRecipe._id}`)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(404)
            done()
          })
      })
    })
  })
})
