
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { Sequelize } = require('sequelize')

const app = express()
const port = 3000

var corsOptions = {
    origin: "http://localhost:8081"
  };
  
app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./src/routes/auth')(app);
require('./src/routes/messages')(app);


const db = require("./src/db.js");

db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Db');
});

app.get('/', async function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send('<h1>Hello world</h1>');
}); 

app.post('/register', (req, res) => {
  res.send('Hello World!')  
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
