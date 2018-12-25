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
   recipes.find({
      name: req.body.name
  }).then(recipe => {
      //if user is undifined it is not in db otherwise this is user is duplicate user
      // so check as follows
      if (recipe) {
          //this user aleady exist, respond with error
          const err = Error('other Recipe of such Exist! Please try an other one.');
          res.json({
              err
          });
          res.status(409);
          next(err);
      } 
      else {
              let newRecipe = {
                  name: req.body.name,
                  steps: req.body.steps,
                 
                  file: req.body.file.name,
                  shortdesc: req.body.shortdesc,
                  category: req.body.category,
                  by: req.body.by,
                  cuisine: req.body.cuisine,
                  createdAt: req.body.createdAt
                  
              };
              console.log('the new recipe is:', newRecipe);
             
              
              recipes.insert(newRecipe).then(insertedRecipe => {
                 
                  console.log('insertedRecipe is:', insertedRecipe);
                 

              }).catch(((error) => {
                  console.log('insert error:', error);
              }));
         // });
      }

});

});

module.exports = router;