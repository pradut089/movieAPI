const express = require('express');
const directors = require('./functionsOfDirectors')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json());
const port = 3000;

app.listen(port, () => {
    console.log('server created ', port);
})

//************************************** DIRECTORS *************************************

app.get('/api/directors', (req, res) => {
    const list = directors.getAllDirectors();
    list.then(result => {
        res.send(result)
    }).catch(err => {
        res.send({ data: {error: `can not retrieve data` }})
    });
});

app.get('/api/directors/:id', (req, res) => {
    const list = directors.getDirectorById(req.params.id)
    list.then(result => {
        res.send(result)
    }).catch(err => {
        res.send({ data: {error: `can not retrieve data` }})
    });
})

app.post('/api/directors', (req, res) => {
    const list = directors.addDirector(req.body);
    list.then(result => {
        console.log('resutl', result.data.affectedRows);
        if( result.data.affectedRows == 1){
            data = {'message': 'Director Added !'};
            res.send(data)
        }
    }).catch(err => {
        res.send({ data: {error: `can not retrieve data` }})
    });
})

app.delete('/api/directors/:id', (req, res) =>{
    const list = directors.deleteDirectorById(req.params.id)
    list.then(result => {
        if(result.data.affectedRows == 1){
            data = {'message': 'Direcctor deleted'}
            res.send(data)
        }
    }).catch(err => {
        res.send({data: {error: `can not delete data`}})
    })
})

