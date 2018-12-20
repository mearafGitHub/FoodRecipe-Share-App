const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//const ObjectId = mongoose.Types.ObjectId();
mongoose.connect('mongodb://localhost/27017');

const user = new Schema({
  
   email: {type: String, required: true},
   password: {type: String, required: true},
   username:{type: String, required: true},
   role: {type: String}
});

module.exports = mongoose.model('User', user);