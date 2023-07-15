const express = require('express');
const tasksController = require('./controllers/task');
const statusController = require('./controllers/status');
const usersController = require('./controllers/users');

const authJwtMiddlewares = require("./middlewares/authJwt")

const router = express.Router()

router.get('/', (req, res) => {
    res.send('Welcome to my todo list')
})

router.post('/task', [authJwtMiddlewares.verifyToken] ,tasksController.createTask);
router.get('/task', [authJwtMiddlewares.verifyToken] ,tasksController.listTasks);
router.put('/task/:id', [authJwtMiddlewares.verifyToken] ,tasksController.updateTask);
router.delete('/task/:id',  [authJwtMiddlewares.verifyToken] ,tasksController.deleteTask)

router.get('/status', [authJwtMiddlewares.verifyToken] , statusController.getStatus)

router.post('/users/create',usersController.createUser)
router.get('/users/email',usersController.validEmail)
router.post('/users/login',usersController.login)
router.post('/users/emailchange',usersController.changeEmail)

module.exports = router