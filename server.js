// packages
const express = require('express');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt');

// contollers
const  { handleSignin } = require('./controller/signin.js');
const  { handleRegister } = require('./controller/register.js');
const  { handleGetUser } = require('./controller/user.js');
const  { handleImageEntry, handleImageDetect } = require('./controller/image.js');

// initialize app
const app = express();
const port = 3001;

// Middleware
app.use(express.json());
app.use(cors());

// initialize database
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'facerecognition'
  }
});

// api
app.get('/', (req, res) => {
  // res.json(database.users);
});
app.post('/signin', handleSignin(db, bcrypt));
app.post('/register', handleRegister(db, bcrypt));
app.get('/user/:id', handleGetUser(db));
app.put('/image-entry', handleImageEntry(db));
app.post('/image-detect', handleImageDetect);

app.listen(port, () => {
  console.log(`App working at port: ${port}`);
});
