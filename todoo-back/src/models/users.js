const connection = require('./connection')

const Users = connection.sequelize.define('users', {
    username: {
        type: connection.Sequelize.STRING
    },
    email: {
        type: connection.Sequelize.STRING
    },
    password: {
        type: connection.Sequelize.STRING 
    }
})

module.exports = Users;