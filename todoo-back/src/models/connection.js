const Sequelize = require('sequelize');

const sequelize = new Sequelize('todolist', 'root', 'ki32151524', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}