const mongoose = require('mongoose');
const Movie = require('../models/movies');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Movies', () => {
  beforeEach((done) => {
    Movie.remove({}, (err) => {
      done();
    });
  });

  describe('GET /api/v1/movies', () => {
    it('it should get all movies', (done) => {
      chai
        .request(app)
        .get('/api/v1/movies')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          done();
        });
    });
  });

  describe('POST /api/v1/movies', () => {
    it('it should not post a movie', (done) => {
      let movie = {
        title: 'Aquaman',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world. ',
        director: 'James Wan',
        writer: [' David Leslie', 'Johnson-McGoldrick'],
        stars: [
          {actor: 'Jason Momoa', characterName: 'Arthur'},
          {actor: 'Amber Heard', characterName: 'Mera'},
          {actor: 'Willem Dafoe', characterName: 'Vulko'}
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'], //  stars: [actorSchema],
        storyline:
          'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title']
      };
      chai
        .request(app)
        .post('/api/v1/movies')
        .send(movie)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Incomplete Inputs');
          done();
        });
    });
    it('it should post a movie', (done) => {
      let movie = {
        title: 'Aquaman',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world. ',
        director: 'James Wan',
        writer: [' David Leslie', 'Johnson-McGoldrick'],
        stars: [
          {
            actor: 'Jason Momoa',
            characterName: 'Arthur'
          },
          {
            actor: 'Amber Heard',
            characterName: 'Mera'
          },
          {
            actor: 'Willem Dafoe',
            characterName: 'Vulko'
          }
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
        //  stars: [actorSchema],
        storyline:
          'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
        genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
      };
      chai
        .request(app)
        .post('/api/v1/movies')
        .send(movie)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('status').eql(200);
          res.body.should.have.property('message').eql('Added successfully');
          done();
        });
    });
  });
  describe('GET /api/v1/movies/:id', () => {
    it('it should GET a movie by the given id', (done) => {
      let movie = new Movie({
        title: 'Aquaman',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world. ',
        director: 'James Wan',
        writer: [' David Leslie', 'Johnson-McGoldrick'],
        stars: [
          {
            actor: 'Jason Momoa',
            characterName: 'Arthur'
          },
          {
            actor: 'Amber Heard',
            characterName: 'Mera'
          },
          {
            actor: 'Willem Dafoe',
            characterName: 'Vulko'
          }
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
        //  stars: [actorSchema],
        storyline:
          'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
        genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
      });
      movie.save((err, movie) => {
        chai
          .request(app)
          .get('/api/v1/movies/' + movie.id)
          .send(movie)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            /* res.body.data.should.have.property('');
            res.body.data.should.have.property('');
            res.body.data.should.have.property(''); */
            res.body.data.should.have.property('_id').eql(movie.id);
            done();
          });
      });
    });
  });
  describe('PUT /api/v1/movies/:id', () => {
    it('it should update a movie given the id', (done) => {
      let movie = new Movie({
        title: 'Bumblebee',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'On the run in the year of 1987, Bumblebee finds refuge in a junkyard in a small Californian beach town. Charlie, on the cusp of turning 18 and trying to find her place in the world, discovers Bumblebee, battle-scarred and broken.',
        director: 'Travis Knight',
        writer: ['Christina Hodson'],
        stars: [
          {
            actor: 'Hailee Steinfeld',
            characterName: 'Charlie'
          },
          {
            actor: 'Jorge Lendeborg Jr.',
            characterName: 'Memo'
          },
          {
            actor: 'John Cena',
            characterName: 'Agent Burns'
          }
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
        storyline:
          'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
        genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
      });
      movie.save((err, movie) => {
        chai
          .request(app)
          .put('/api/v1/movies/' + movie.id)
          .send({
            title: 'Justice League',
            posterUrl: 'http://posterUrl.com/folder',
            trailerUrl: 'http://posterUrl.com/trailer',
            description:
              'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world. ',
            director: 'James Wan',
            writer: [' David Leslie', 'Johnson-McGoldrick'],
            stars: [
              {
                actor: 'Jason Momoa',
                characterName: 'Arthur'
              },
              {
                actor: 'Amber Heard',
                characterName: 'Mera'
              },
              {
                actor: 'Willem Dafoe',
                characterName: 'Vulko'
              }
            ],
            photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
            //  stars: [actorSchema],
            storyline:
              'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
            keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
            genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
          })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('message').eql('Movie updated');
            res.body.should.have.property('status').eql(200);
            chai
              .request(app)
              .get('/api/v1/movies/' + movie.id)
              .send(movie)
              .end((err, res) => {
                res.body.data.should.have.property('title').eql('Justice League');
                done();
              });
          });
      });
    });
  });

  describe('DELETE /api/v1/movies/:id', () => {
    it('it should DELETE a movie given the id', (done) => {
      let movie = new Movie({
        title: 'Aquaman',
        posterUrl: 'http://posterUrl.com/folder',
        trailerUrl: 'http://posterUrl.com/trailer',
        description:
          'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world. ',
        director: 'James Wan',
        writer: [' David Leslie', 'Johnson-McGoldrick'],
        stars: [
          {
            actor: 'Jason Momoa',
            characterName: 'Arthur'
          },
          {
            actor: 'Amber Heard',
            characterName: 'Mera'
          },
          {
            actor: 'Willem Dafoe',
            characterName: 'Vulko'
          }
        ],
        photourl: ['http://posterUrl.com/pic1', 'http://posterUrl.com/pic2'],
        //  stars: [actorSchema],
        storyline:
          'Arthur Curry learns that he is the heir to the underwater kingdom of Atlantis, and must step forward to lead his people and be a hero to the world.',
        keywords: ['atlantis', 'based on comic', 'dc comics', 'superhero', 'one word title'],
        genres: ['Action', 'Adventure', 'Fantasy', 'Sci - Fi']
      });
      movie.save((err, movie) => {
        chai
          .request(app)
          .delete('/api/v1/movies/' + movie.id)
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
