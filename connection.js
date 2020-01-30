const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db'
})

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
});

function checkQuery(query){
    return new Promise((resolve, reject) => {
        connection.query(query, (err, result) => {
            if (err){
                throw err;
            }
            else{
                const result = {data: result};
                resolve(result)
               
            }
        })
    })
}

module.exports = {
    connection,
    checkQuery
}