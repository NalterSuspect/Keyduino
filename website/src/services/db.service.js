const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./src/services/data.db') 

function createUser(username,password){
    const query = `INSERT INTO user (username,password) VALUES (?,?)`
    db.run(query,[username,password]);
    db.close();
}

async function getUser(identification){
    if(typeof identification === 'string'){
        const query = `SELECT id,username,password FROM user WHERE username= ?`
        const userObj = await db_get(query,[identification]);
        return userObj;
    }else{
        const query = `SELECT id,username,password FROM user WHERE id= ?`
        const userObj = await db_get(query,[identification]);
        return userObj;
    }
}

async function db_all(query) {
    return new Promise(
        function(resolve,reject){
            db.all(query, 
                function(err,rows){
                    if(err){return reject(err);}
                    resolve(rows);
                });
    });
}

async function db_get(query,params) {
    return new Promise(
        function(resolve,reject){
            db.get(query, params, function(err,rows){
                    if(err){return reject(err);}
                    resolve(rows);
                });
    });
}

async function closeDataBase(){
    db.close();
}

module.exports = {
    createUser,
    getUser,
    closeDataBase,
    db_all
}