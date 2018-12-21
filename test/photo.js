const mongoose = require('mongoose');
const Shot = require('../models/shots');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Shots', () => {
  beforeEach((done) => {
    Shot.remove({}, (err) => {
      done();
    });
  });

  describe('GET /api/v1/photos', () => {
    it('it should get all shot', (done) => {
      chai
        .request(app)
        .get('/api/v1/photos')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });
  });

  describe('POST /api/v1/photos', () => {
    it('it should post a shot', (done) => {
      let shot = {
        shoturl: 'http://shoturl/mediaviewer',
        actor: ['Carol Kane', 'Jane Krakowski', 'Ellie Kemper', 'Tituss Burgess'],
        movie: 'Unbreakable Kimmy Schmidt'
      };
      chai
        .request(app)
        .post('/api/v1/photos')
        .send(shot)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Added successfully');
          done();
        });
    });
  });
  describe('GET /api/v1/photos/:id', () => {
    it('it should GET a shot by the given id', (done) => {
      let shot = new Shot({
        shoturl: 'http://shoturl/mediaviewer',
        actor: ['Ellie Kemper', 'Jane Krakowski', 'Ellie Kemper', 'Tituss Burgess'],
        movie: 'Unbreakable Kimmy Schmidt'
      });
      shot.save((err, shot) => {
        chai
          .request(app)
          .get('/api/v1/photos/' + shot.id)
          .send(shot)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            /* res.body.data.should.have.property('');
            res.body.data.should.have.property('');
            res.body.data.should.have.property(''); */
            res.body.data.should.have.property('_id').eql(shot.id);
            done();
          });
      });
    });
  });
  describe('PUT /api/v1/photos/:id', () => {
    it('it should update a shot given the id', (done) => {
      let shot = new Shot({
        shoturl: 'http://shoturl/mediaviewer',
        actor: ['Ellie Kemper'],
        movie: 'Unbreakable Kimmy Schmidt'
      });
      shot.save((err, shot) => {
        chai
          .request(app)
          .put('/api/v1/photos/' + shot.id)
          .send({
            shoturl: 'http://shoturl/mediaviewer',
            actor: ['Ellie Kemper'],
            movie: 'Unbreakable Kimmy Schmidt'
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Shot updated');
            res.body.should.have.property('status').eql(200);
            done();
          });
      });
    });
  });

  describe('DELETE /api/v1/photos/:id', () => {
    it('it should DELETE a shot given the id', (done) => {
      let shot = new Shot({
        shoturl: 'http://shoturl/mediaviewer',
        actor: ['Ellie Kemper'],
        movie: 'Unbreakable Kimmy Schmidt'
      });
      shot.save((err, shot) => {
        chai
          .request(app)
          .delete('/api/v1/photos/' + shot.id)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Deleted successfully');
            res.body.should.have.property('status').eql(200);
            done();
          });
      });
    });
  });
});
