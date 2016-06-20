require('should');

const request = require('supertest');
const app = require('./helpers/mock.app');
const config = require('../src/config/config');
var token = '';
var aCard = require('./helpers/newRecipe');
var newRecipe = JSON.parse(JSON.stringify(aCard));
var updatedCard = JSON.parse(JSON.stringify(newRecipe));
updatedCard.idName = (JSON.parse(JSON.stringify(updatedCard.name.toLowerCase()))).replace(/ /g, '-').replace(/\./g, '');

describe('Cards.', function () {
  this.timeout(5000);

  describe('/api/recipes', () => {
    before((done) => {
        request(app)
          .post('/api/authenticate')
          .set('Accept', 'application/x-www-form-urlencoded')
          .send({ username: config.ADMIN_USERNAME, password: config.ADMIN_PASSWORD})
          .end((err, res) => {
            token = res.text;
            done();
          });
    });
    describe('POST /', () => {
      it('should create a new Recipe', done => {
        request(app)
          .post('/api/recipes')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(newRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(201);
            newRecipe.idName = res.body.idName;
            done();
          });
      });

      it('should try to create a duplicated card', done => {
        request(app)
          .post('/api/recipes')
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(newRecipe)
          .end((err, res) => {
            res.status.should.eql(500);
            done();
          });
      });

      it('should try to create a new Recipe with no token', done => {
        request(app)
          .post('/api/recipes')
          .set('Accept', 'application/json')
          .send(newRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(401);
            done();
          });
      });

      it('should try to create a new Recipe with an invalid token', done => {
        request(app)
          .post('/api/recipes')
          .set('Accept', 'application/json')
          .set('Authorization', '111111111111111111111111111111111111.111111111111111111111111111111111111111111111111111111111111111111111111.1111111111111111111111111111111111111111111')
          .send(newRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(401);
            done();
          });
      });
    });

    describe('GET /', () => {
      it('should find all recipes', done => {
        request(app)
          .get('/api/recipes')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            newRecipe._id = res.body[0]._id;
            res.body[0].name.should.eql(newRecipe.name);
            res.body[0].rarity.should.eql(newRecipe.rarity);
            res.body[0].type.should.eql(newRecipe.type);
            res.body[0].description.should.eql(newRecipe.description);
            res.body[0].arena.should.eql(newRecipe.arena);
            res.body[0].elixirCost.should.eql(newRecipe.elixirCost);
            res.status.should.eql(200);
            done();
          });
      });

      it('should find one recipe by id', done => {
        request(app)
          .get('/api/recipes/' + newRecipe._id)
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.body.name.should.eql(newRecipe.name);
            res.body.rarity.should.eql(newRecipe.rarity);
            res.body.type.should.eql(newRecipe.type);
            res.body.description.should.eql(newRecipe.description);
            res.body.arena.should.eql(newRecipe.arena);
            res.body.elixirCost.should.eql(newRecipe.elixirCost);
            res.status.should.eql(200);
            done();
          });
      });

      it('should find one recipe by idName', done => {
        request(app)
          .get('/api/recipes/' + newRecipe.idName)
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.body.name.should.eql(newRecipe.name);
            res.body.rarity.should.eql(newRecipe.rarity);
            res.body.type.should.eql(newRecipe.type);
            res.body.description.should.eql(newRecipe.description);
            res.body.arena.should.eql(newRecipe.arena);
            res.body.elixirCost.should.eql(newRecipe.elixirCost);
            res.status.should.eql(200);
            done();
          });
      });

      it('should not find one recipe by id', done => {
        request(app)
          .get('/api/recipes/111111111111111111111111')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(404);
            done();
          });
      });

      it('should not find one recipe by idName', done => {
        request(app)
          .get('/api/recipes/some-name-here')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(404);
            done();
          });
      });

      it('should find recipe by type', done => {
        request(app)
          .get('/api/recipes?rarity='  + newRecipe.rarity)
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.body[0].name.should.eql(newRecipe.name);
            res.body[0].rarity.should.eql(newRecipe.rarity);
            res.body[0].type.should.eql(newRecipe.type);
            res.body[0].description.should.eql(newRecipe.description);
            res.body[0].arena.should.eql(newRecipe.arena);
            res.body[0].elixirCost.should.eql(newRecipe.elixirCost);
            res.status.should.eql(200);
            done();
          });
      });
    });

    describe('PUT /', () => {
      it('should update a recipe', done => {
        updatedRecipe.name = 'New Name';
        request(app)
          .put('/api/recipes/' + newRecipe._id)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(updatedRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            newRecipe._id = res.body._id;
            res.body.name.should.eql(updatedRecipe.name);
            res.body.rarity.should.eql(newRecipe.rarity);
            res.body.type.should.eql(newRecipe.type);
            res.body.description.should.eql(newRecipe.description);
            res.body.arena.should.eql(newRecipe.arena);
            res.body.elixirCost.should.eql(newRecipe.elixirCost);
            res.status.should.eql(200);
            done();
          });
      });

      it('should try to delete an invalid recipe', done => {
        updatedRecipe._id = '111111111111111111111111';
        request(app)
          .put('/api/recipes/' + updatedRecipe._id)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .send(updatedRecipe)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(404);
            done();
          });
      });
    });

    describe('DELETE /', () => {
      it('should delete a recipe', done => {
        request(app)
        .delete('/api/recipes/' + newRecipe._id)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(204);
            done();
          });
      });
    });

    describe('DELETE /', () => {
      it('should try to delete an invalid recipe', done => {
        request(app)
          .delete('/api/recipes/' + newRecipe._id)
          .set('Accept', 'application/json')
          .set('Authorization', token)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            res.status.should.eql(404);
            done();
          });
      });
    });

  });
});
