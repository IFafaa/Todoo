const connection = require('./connection')

const Tasks = connection.sequelize.define('tasks', {
    name: {
        type: connection.Sequelize.STRING
    },
    status: {
        type: connection.Sequelize.STRING
    },
    description: {
        type: connection.Sequelize.TEXT 
    },
    userId: {
        type: connection.Sequelize.STRING
    }
})

module.exports = Tasks;