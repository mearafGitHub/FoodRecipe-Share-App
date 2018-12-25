const bcrypt = require('bcrypt');
const db = require('./db/connection');
const users = db.get('users');

 function initDB(){
     console.log('init init')
   
    users.findOne({
        username: 'Town_Admin'
    }).then(user => {
        
        if (user) {
           console.log('this user aleady exist');
          // next();
        } else {
          
            bcrypt.hash('Town_Admin_In', 10).then((hashedPW) => {
                let newUser = {
                    username: 'Town_Admin',
                    password: hashedPW,
                    role: 'admin'
                };

                console.log('hashed password is:', hashedPW);
                users.insert(newUser).then((insertedUser) => {
                    
                    console.log('Admin object is:', insertedUser);
                    
                }).catch(((error) => {
                    console.log('Admin insert error:', error);
                }));
            });
        }
    })
}

module.exports = initDB;