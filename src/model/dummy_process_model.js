const pool = require('../dbconnection')

const getUser = (payload) => { //payload being a parameter that needed to run query, each $1 (parameter) is being represented by the payload respectively
    return pool.query("SELECT * FROM user WHERE username = $1", payload)
}

module.exports = {
    'getUser' : getUser
}