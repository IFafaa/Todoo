const express = require('express');
const app = express();
const routes = require('./routes')
const bodyParser = require('body-parser')
const cors = require('cors');


app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())
app.use(routes)

module.exports = app