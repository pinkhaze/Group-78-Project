// ./database/db-connector.js

// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// // Create a 'connection pool' using the provided credentials
// var pool = mysql.createPool({
//     connectionLimit : 10,
//     host            : 'classmysql.engr.oregonstate.edu',
//     user            : 'cs340_sargeanp',
//     password        : '7494',
//     database        : 'cs340_sargeanp'
// })

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'classmysql.engr.oregonstate.edu',
    user            : 'cs340_raciam',
    password        : 'fa14UscUoqI6',
    database        : 'cs340_raciam'
})

// Export it for use in our applicaiton
module.exports.pool = pool;