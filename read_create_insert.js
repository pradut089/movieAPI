const mysql = require('mysql');
const movieData = require('./movies.json')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db'
})

const createDirector = 'CREATE TABLE director(id INT(20) PRIMARY KEY AUTO_INCREMENT, name VARCHAR(30))';

const insertIntoDirector = 'INSERT INTO director (name) VALUES'
let Directors = [];

for (movie of movieData) {
    if (Directors.indexOf(movie['Director']) === -1) {
        Directors.push(movie['Director'])
    }
}

const createMovie = 'CREATE TABLE movie(id  INT(20) PRIMARY KEY AUTO_INCREMENT,rank VARCHAR(10), title VARCHAR(100), description VARCHAR(300), runtime INT, genre VARCHAR(50), rating FLOAT, metascore VARCHAR(10), votes INT, gross_earning_in_mil VARCHAR(20), director_id INT, FOREIGN KEY (`director_id`) REFERENCES `director`(`id`), actor VARCHAR(50), year YEAR(4));';

const insertIntoMovie = 'INSERT INTO movie (rank,title, description, runtime, genre, rating, metascore, votes, gross_earning_in_mil, director_id, actor, year) VALUES ?';
const newMovieList = [];

for (movie of movieData) {
    let movieList = []
    for (movieDeatail in movie) {
        if (movieDeatail != 'Director') {
            movieList.push(movie[movieDeatail])
        }
        else {
            movieList.push(Directors.indexOf(movie[movieDeatail]) + 1);
        }
    }
    newMovieList.push(movieList)
}

connection.connect((err) => {
    if (err) throw err;
    else {
        console.log('connected')
        connection.query(createDirector, (err, result) => {
            if (err) throw err;
            console.log(result);
        })
        for (let name of Directors) {
            connection.query(insertIntoDirector + ` ("${name}")`, (err, result) => {
                if (err) throw err;
                console.log(result);
            })
        }
        connection.query(createMovie, (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        connection.query(insertIntoMovie, [newMovieList], (err, result) => {
            if (err) throw err;
            console.log(result);
        });
        connection.end();
    }
})