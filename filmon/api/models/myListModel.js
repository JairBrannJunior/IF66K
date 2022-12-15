const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'filmon',
  password: 'password',
  port: 5432
});

const getMyListMovies = (id) => {
    return new Promise(function(resolve, reject) {
        pool.query('select * from mylistmovies where user_id = $1', [id], (error, results) => {
        if (error) {
            reject(error);
        }
        resolve(results.rows);
        })
    })
}

const addMovieToMyList = (body) => {
  return new Promise(function(resolve, reject) {
    const { userId, movieId, movieName, movieImg } = body;
    pool.query('insert into mylistmovies (user_id, movie_id, movie_name, movie_img) values ($1, $2, $3, $4)', [userId, movieId, movieName, movieImg], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Adicionado o filme na sua lista!`);
    })
  })
}

const deleteMovieFromMyList = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('delete from mylistmovies where id = $1', [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Filme removido da lista`);
    })
  })
}

const saveComment = (body) => {
  return new Promise(function(resolve, reject) {
    const { userId, movieId, comment, userName} = body;
    pool.query('insert into moviecomments (user_id, movie_id, comment, user_name) values ($1, $2, $3, $4)', [userId, movieId, comment, userName], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Comentário feito com sucesso!`);
    })
  })
}

const getMovieComments = (id) => {
  return new Promise(function(resolve, reject) {
      pool.query('select * from movieComments where movie_id = $1', [id], (error, results) => {
      if (error) {
          reject(error);
      }
      resolve(results.rows);
      })
  })
}

const watchedMovie = (body) => {
  return new Promise(function(resolve, reject) {
    const { id } = body;
    pool.query('update mylistmovies set watched = (select case when watched = true then false else true end as watched from mylistmovies where id = $1) where id = $1', [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Alterado com sucesso!`);
    })
  })
}

const login = (body) => {
  return new Promise(function(resolve, reject) {
    const { email, password } = body;
    pool.query('select id, name from users where email = $1 and password = $2', [email, password], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    })
  })
}

const register = (body) => {
  return new Promise(function(resolve, reject) {
    const { name, email, password } = body;
    pool.query('insert into users (name, email, password) values ($1, $2, $3)', [name, email, password], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Registrado com sucesso!`);
    })
  })
}

module.exports = {
    getMyListMovies,
    deleteMovieFromMyList,
    addMovieToMyList,
    saveComment,
    getMovieComments,
    watchedMovie,
    login,
    register
}