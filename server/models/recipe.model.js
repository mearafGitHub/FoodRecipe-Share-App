const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://localhost/recipe');

const recipes = new Schema({
   _id: ObjectId,
   file:{type: long, required},
   name: {type: String, required: true},
   category: {type: String, required: true},
   shortdesc:{type: String, required: true},
   cuisine:{type: String, required: true},
   steps:{type: ArrayBuffer, required: true}
});

module.exports = mongoose.model('Recipe', recipe);