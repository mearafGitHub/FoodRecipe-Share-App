const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Recipe = require('../models/recipe.model');


router.get('/list', async (req, res) => {
    const list = await req.Recipes();
    res.send(await list.find({}).toArray());
});

router.post('/publish', async (req, res) => {
    console.log("posted recepie:",req.body)
    //const item = await Recipe();
    const {ops}  = await Recipe.insertOne(
        {  
            file: req.body.file,
            name: req.body.name,
            category: req.body.category,
            cuisine: req.body.cuisine,
            shortdesc: req.body.shortdesc,
            createdAt: new Date(),
            steps: req.body.steps[{

            }]
        }
    );

    res.status(200).send(ops[0]);
});

module.export