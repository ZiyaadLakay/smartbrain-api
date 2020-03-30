const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const cors = require('cors')

const register = require('./contollers/register')
const signin = require('./contollers/signin')
const profile = require('./contollers/profile')
const image = require('./contollers/image')

const db = require('knex')({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'postgres',
        password : '1234',
        database : 'smartbrainDB'
  }
});

db.select('*').from('users').then(data => {
    console.log(data);
});

const app = express(); //Starting express app
app.use(bodyParser.json()) //helps parsing json
app.use(cors())

//Home Route  
app.get('/', (req,res) => {
    res.send(database.users);
})

//Sign In Function
app.post('/signin', (req,res) => {signin.handleSignin(req,res,db,bcrypt)})

//Register Function
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

//Profile Function
app.get('/profile/:id',(req,res) => {profile.handleProfile(req,res,db)})

//Image counter funtion
app.put('/image', (req,res) => {image.handleImage(req,res,db)})
app.post('/imageurl', (req,res) => {image.handleApiCall(req,res)})


//Listening on port 
app.listen(process.env.PORT || 8000, () => {
    console.log('app is running on port ${process.env.PORT}')
})