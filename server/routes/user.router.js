const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
// import Joi from 'joi'
// const schema = Joi.object().keys({
//     username: Joi.string().regex((/(^[a-zA-Z0-9_]+$)/)).min(3).max(30).required(),
//     password: Joi.string().trim().min(8).required()

// });

router.post('/signup', async function (req, res) {

    await bcrypt.hash(req.body.password, 10, async function (err, hash) {
        const user = new User.findorCreate({
            _id: new mongoose.Types.ObjectId(),
            email: req.body.email,
            username: req.body.username,
            password: hash,
            role: 'guest'
        });
        await user.save();
        res.status(200).json({
            success: ' this is New user => has been created'
        });

        reject({
            error: 'erfc'
        });

        //  user = new User({
        //     _id: new mongoose.Types.ObjectId(),
        //     email: req.body.email,
        //     username: req.body.username,
        //     password: hash,
        //     role:'guest'
        // });
        // user.save().then(function (result) {
        //     console.log(result);
        //     console.log(user);
        //     res.status(200).json({
        //         success: ' this is New user => has been created'
        //     });
        // }).catch(error => {
        //     res.status(500).json({
        //         error: err
        //     });
        // });

    });
});

router.post('/signin', function (req, res) {
    User.findOne({
            username: req.body.username
        })
        .exec()
        .then(function (user) {
            bcrypt.compare(req.body.password, user.password, function (err, result) {
                if (err) {
                    return res.status(401).json({
                        failed: 'Unauthorized Access'
                    });
                }

                if (result) {
                    const JWT = jwt.sign({
                            username: user.username,
                            _id: user._id
                        },
                        'secret', {
                            expiresIn: '2h'
                        });
                    return res.status(200).json({
                        success: 'user signed in',
                        token: JWT
                    });
                    console.log(`Token:` + JWT);
                }
                return res.status(401).json({
                    failed: 'Unauthorized Access'
                });
            });
        })
        .catch(error => {
            res.status(500).json({
                error: error
            });
        });
});


module.exports = router;