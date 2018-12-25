const express = require('express');
const router = express.Router();

const db = require('../db/connection');
const recipes = db.get('recipes');


router.get('/', (req, res) =>{

    recipes.find({
        
    }).then((recipes) => {
           
       res.json(recipes);
     }).catch((err)=>{
      const error = Error('You Have No Recipes Created!');
      res.send(error);
      next(err);
        console.log(err);
     });
  
  });


router.get('/list', (req, res) =>{

      //res.send( recipes.find({}).toArray());

    recipes.find({}).then((recipes) => {
           
       res.json(recipes);
   
     }).catch((err)=>{
      const error = Error('No Recipes Found!');
      res.send(error);
      next(err);
        console.log(err);
     });
      



});
router.post('/create', (req, res) =>{


            //   let newRecipe = {
            //       name: req.body.name,
            //       steps: req.body.steps,
                 
            //       file: req.body.file.name,
            //       shortdesc: req.body.shortdesc,
            //       category: req.body.category,
            //       by: req.body.by,
            //       cuisine: req.body.cuisine,
            //       createdAt: req.body.createdAt
                  
            //   };
              console.log('the new recipe is:', req.body);
             
              
              //recipes.insert(newRecipe).then(insertedRecipe => {
                recipes.insert(req.body).then(insertedRecipe => { 
                  console.log('insertedRecipe is:', insertedRecipe);
                 

              }).catch(((error) => {
                  console.log('insert error:', error);
              }));
         // });


});

// router.delete('/:id', async (req, res)=>{
//   const posts = await loadPostCollection();
//   await recipes.deleteOne({ _id: new mongodb.ObjectID(req.params.id)});
//   res.status(200).send('one row deleted ');
// });

router.delete('/:id', (req, res) => {
  //users.remove({ woot: 'foo' })
  recipes.remove({ _id: req.params.id });
  res.status(200).send('one recipe deleted ');
});


router.delete('/remove', (req, res) => {
  users.remove({ _id: req.params.id })
  res.status(200).send('one recipe deleted ');
});

module.exports = router;