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

module.exports = {
    getMyListMovies,
    deleteMovieFromMyList,
    addMovieToMyList
}