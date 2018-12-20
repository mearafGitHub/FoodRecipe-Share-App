const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/user.model');

async function initDB(){
    console.log('init')
    const hash = await bcrypt.hash('123456',10);
    const user = new User.findorCreate({
        _id: new mongoose.Types.ObjectId(),
        email: 'admin@gmail.com',
        username: 'admin',
        password: hash,
        role:'admin'
    });
     await user.save();

}

module.exports = initDB;