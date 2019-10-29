const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config() //to use dotenv file

const app = express()

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error)) //log error if there is a db error
db.once('open', () => console.log('connected to database')) //on db connection

//tells express to accept JSON
app.use(express.json())

//the lines below tell server.js about our route -users.js
const usersRouter = require('./routes/users')
app.use('/users', usersRouter)





app.listen(3001, () => console.log('server started' ))