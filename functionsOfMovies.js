const connection = require('./connection')

function getAllMovies() {
    const getAllMovies = 'SELECT * FROM movie;';
    return connection.checkQuery(getAllMovies)
}

function getMovieById(id) {
    const getMovieById = `SELECT * FROM movie WHERE id = ${id};`
    return connection.checkQuery(getMovieById);
}

function deleteMovieById(id) {
    const deleteMovieById = `DELETE FROM movie WHERE id = ${id};`
    return connection.checkQuery(deleteMovieById);      
}

function addMovie(movieDetails) {
    const addMovie = `INSERT INTO movie (rank, title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director_id, actor, year) VALUES ("${movieDetails['rank']}","${movieDetails['title']}", "${movieDetails['description']}", ${movieDetails['runtime']}, "${movieDetails['genre']}", ${movieDetails['rating']}, "${movieDetails['metascore']}", ${movieDetails['votes']}, "${movieDetails['gross_earning_mil']}", ${movieDetails['director_id']}, "${movieDetails['actor']}", ${movieDetails['year']});`
    return connection.checkQuery(addMovie);
}

module.exports = {
    getAllMovies,
    getMovieById,
    deleteMovieById,
    addMovie
}