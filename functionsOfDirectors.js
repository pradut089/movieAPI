const connection = require('./connection')

 function getAllDirectors(){
    const getAllDirectors = 'select * from director;';
    return connection.checkQuery(getAllDirectors);
}

 function getDirectorById(id){
    const getDirectorById = `select * from director where id = ${id};`   
    return connection.checkQuery(getDirectorById);
}

 function deleteDirectorById(id){
    const deleteDirectorById = `delete from director where id = ${id};`    
    return connection.checkQuery(deleteDirectorById);
}

 function addDirector(bodyData){
    const addDirector = `insert into director (name) values ("${bodyData['name']}")`;
    return connection.checkQuery(addDirector);
}

module.exports = {
    getAllDirectors,
    getDirectorById,
    deleteDirectorById,
    addDirector
}