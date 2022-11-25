const express = require('express');
const app = express();
const port = 3001;

const myListMoviesModel = require('./models/myListModel');

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/:id', (req, res) => {
  myListMoviesModel.getMyListMovies(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.post('/myListMovies', (req, res) => {
  myListMoviesModel.addMovieToMyList(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.delete('/myListMovies/:id', (req, res) => {
  console.log(req.params.id);
  myListMoviesModel.deleteMovieFromMyList(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  })
});

app.post('/saveComment', (req, res) => {
  myListMoviesModel.saveComment(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
});

app.get('/getMovieComments/:id', (req, res) => {
  myListMoviesModel.getMovieComments(req.params.id)
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