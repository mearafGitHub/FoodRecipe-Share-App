const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const seed = require('./seed')
const cors = require('cors');
const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });
// cors({
//    origin('*');
// });

app.get('/test', function(req, res){
    res.json({
       "message": "Magnifico"
    });
 });
 const user = require('./routes/user.router.js');

app.use('/user', user);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));
mongoose.connect('mongodb://localhost/recepie');
seed();
