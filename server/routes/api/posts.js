const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// 1.  GET POST route
router.get('/', async (req, res) => {
    const posts = await loadPostCollection();
    res.send(await posts.find({}).toArray());
});

// 2. ADD POST route
router.post('/', async (req, res) => {
    const posts = await loadPostCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });

    res.status(201).send();
});


// 3. DELETE POST route
router.delete('/:id', async (req, res)=>{
    const posts = await loadPostCollection();
    await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send('one row deleted');
});

async function loadPostCollection(){
    const client = await mongodb.MongoClient.connect('mongodb://townuser:town123@ds157702.mlab.com:57702/town_recipe', {
        useNewUrlParser: true
    });

    return client.db('town_recipe').collection('posts');
}

module.exports = router;