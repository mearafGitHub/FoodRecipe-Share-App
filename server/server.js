const express = require('express');
const morgan = require('morgan');
const volleyball = require('volleyball');
const seed = require('./seed');
require('dotenv').config();
const cors = require('cors');
const app = express();
const middlewares = require('./routes/middlewares');
const profiles = require('./api/profiles');

app.use(volleyball);
app.use(morgan('combined'));
app.use(express.json());
app.use(middlewares.checkTokenSetUser);

app.use(cors());
app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
 });

app.get('/', function(req, res){
    res.json({
       "Mearaf": "Magnifico!!",
       user: req.user
    });
    console.log(user);
 });

 seed();
const user = require('./routes/user.router.js');
const recipes = require('./routes/recipe.router.js');
app.use('/user', user);
app.use('/recipes', recipes);

app.use('/api/user/profiles',middlewares.isSignedIn, profiles);



// function notFound(req, res, next){
//    res.status(404);
//    const error = new Error ('Not Found->' +req.originalUrl);
//    next(error);
// }

// function errorHandler(err, req,res, next){
//    res. status(res.statusCode || 500);
//    res.json({
//       message: err.message,
//       stack: err.stack
//    })
// }

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server started on port ${port}`));

// app.use(notFound);
// app.use(errorHandler);

