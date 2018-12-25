const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const users = db.get('users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');



//index it for faster querying in to the users collection
//users.createIndex('username', {
//  unique: true
//});

const schema = Joi.object().keys({
    username: Joi.string().regex((/(^[a-zA-Z0-9_]+$)/)).min(3).max(30).required(),
    password: Joi.string().trim().min(8).required()
    // trim() validates any white spaces
});

function createTokenSendToken(user, res, next) {
    const playload = {
        _id: user._id,
        username: user.username
    };
    jwt.sign(playload, process.env.TOKEN_SECRET, {
        expiresIn: '1d'
    }, (err, token) => {
        //err- we couldn't create the token
        if (err) {

            errorResponse(res, next);

        } //else 
        else {
            //token is created-so pass d token as object to d client
            console.log('the token:', token)
            return res.status(200).json({
                token: token
            });
        }
    });
}

router.post('/signup', (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
        //error===null ->check if the user is unique -> has d pw & register it to db
        users.findOne({
            username: req.body.username
        }).then(user => {
            //if user is undifined it is not in db otherwise this is user is duplicate user
            // so check as follows
            if (user) {
                //this user aleady exist, respond with error
                const err = Error('Duplicate username!');
                res.json({
                    err
                });
                res.status(409);
                next(err);
            } else {
                //hash d pw and store it to db
                bcrypt.hash(req.body.password.trim(), 8).then((hashedPW) => {

                    let newUser = {
                        username: req.body.username,
                        password: hashedPW
                    };
                    console.log('username is:', req.body.username);
                    console.log('plain password is:', req.body.password);
                    console.log('hashed password is:', hashedPW);
                    users.insert(newUser).then(insertedUser => {
                        delete insertedUser.password;
                        console.log('insertedUser is:', insertedUser);
                        //res.json(insertedUser);
                        //when ever sm1 signs up respond wz d token
                        createTokenSendToken(insertedUser, res, next);

                    }).catch(((error) => {
                        console.log('insert error:', error);
                    }));
                });
            }
        });
    } else {
        res.status(422);
        //pass the error to the next function
        next(result.error);
    }

});

function errorResponse(res, next) {
    res.status(422);
    const error = new Error('Problem happened when trying to sign in');
    next(error);
}

router.post('/signin', (req, res, next) => {

    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
        users.findOne({
                username: req.body.username
            })
            .then((user) => {
                // then check if the pw matches and handle d error
                if (user) {

                    // after i find my use in my db compare hash, if resul is false wrong pw
                    bcrypt.compare(req.body.password, user.password).then((result) => {

                        // console.log(result);

                        if (result) {

                            //jwt playlod
                            const playload = {
                                _id: user._id,
                                username: user.username
                            };
                            jwt.sign(playload, process.env.TOKEN_SECRET, {
                                expiresIn: '2d'
                            }, (err, token) => {
                                //err- we couldn't create the token
                                if (err) {
                        
                                    errorResponse(res, next);
                        
                                } //else 
                                else {
                                    //token is created-so pass d token as object to d client
                                    console.log('the token:', token)
                                    return res.status(200).json({
                                        token: token
                                    });
                                }
                            });
                           
                        } else {
                            errorResponse(res, next);
                            res.json(res.error);
                        }
                    });

                } else {
                    errorResponse(res, next);
                }

            })

    } else {
        errorResponse(res, next);
    }


});


module.exports = router;