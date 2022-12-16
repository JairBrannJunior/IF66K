const codeKey = require('./enviroment');
const express = require('express');
const jwt = require('jsonwebtoken');
const { expressjwt } = require("express-jwt");
const app = express();
const port = 3001;

const myListMoviesModel = require('./models/myListModel');

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization');
  next();
});

app.get('/:id', expressjwt({ secret: codeKey, algorithms: ['HS256']}), (req, res) => {
  myListMoviesModel.getMyListMovies(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.post('/myListMovies', expressjwt({ secret: codeKey, algorithms: ['HS256']}), (req, res) => {
  myListMoviesModel.addMovieToMyList(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.delete('/myListMovies/:id', expressjwt({ secret: codeKey, algorithms: ['HS256']}), (req, res) => {
  myListMoviesModel.deleteMovieFromMyList(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.post('/saveComment', expressjwt({ secret: codeKey, algorithms: ['HS256']}), (req, res) => {
  myListMoviesModel.saveComment(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/getMovieComments/:id', expressjwt({ secret: codeKey, algorithms: ['HS256']}), (req, res) => {
  myListMoviesModel.getMovieComments(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.put('/watchedMovie', expressjwt({ secret: codeKey, algorithms: ['HS256']}), (req, res) => {
  myListMoviesModel.watchedMovie(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.post('/login', (req, res) => {
  myListMoviesModel.login(req.body)
  .then(response => {
    if (response.length > 0) {
      console.log(codeKey);
      const token = jwt.sign({
        id: response[0].id,
        name: response[0].name
      }, codeKey);
      res.json({ token: token });
    } else
      res.status(403).json({ message: 'Invalid user or password!' })
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.post('/register', (req, res) => {
  myListMoviesModel.register(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});