const express = require('express');
const router = express.Router();
const Joi = require('joi');
const db = require('../db/connection');
const recipes = db.get('recipes');

const schema = Joi.object().keys({
    name: Joi.string().regex((/(^[a-zA-Z0-9_]+$)/)).trim().min(3).max(25).required(),
    name: Joi.string().trim().min(8).max(30).required(),
    steps: Joi.string().trim().min(100).max(500).required(),
    steps: Joi.string().regex((/(^[a-zA-Z0-9_]+$)/)).min(3).max(30).required(),
    shortdesc: Joi.string().regex((/(^[a-zA-Z0-9_]+$)/)).min(3).max(30).required(),
    shortdesc: Joi.string().trim().min(8).max(50).required(),
    cuisine: Joi.string().regex((/(^[a-zA-Z0-9_]+$)/)).min(8).max(24).required(),
    cuisine: Joi.string().trim().min(8).max(24).required(),
    category: Joi.string().regex((/(^[a-zA-Z0-9_]+$)/)).trim().min(8).max(24).required(),
    by: Joi.string().regex((/(^[a-zA-Z0-9_]+$)/)).trim().min(8).max(24).required(),
    
    // trim() validates any white spaces
});




router.get('/', (req, res) =>{

  recipes.find({
      user_id: req.user._id
  }).then((recipes) => {
         
     res.json(recipes);
   }).catch((err)=>{
    const error = Error('You Have No Recipes Created!');
    res.send(error);
    next(err);
      console.log(err);
   });

});

//-----------------------------------------
router.post('/publish', (req, res, next) =>{
const result = Joi.validate(req.body, schema);
if(result.error === null){
    console.log('the new recipe is:', newRecipe);
    // to identify to whom this recipe belogns to store d user id wz d current username
    const recipe = {
       ...req.body, // for i have middleware to access the curently logged in user req.user._id 
       user_id:  req.user._id,
       //username: req.user.username
    };
            
        recipes
        .insert(recipe)
        .then(insertedRecipe => {
            
            console.log('insertedRecipe is:', insertedRecipe);
            

        }).catch(((error) => {
            console.log('insert error:', error);
        }));
}
else{
res.status(422);    
const err = new Error(result.error);
next(err);
}

});

module.exports= router;