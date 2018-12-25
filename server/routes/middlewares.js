const jwt = require('jsonwebtoken');

function checkTokenSetUser( req, res, next){
const authHeader = req.get('authorization');
        if(authHeader){
            //console.log(authHeader);
            const token =  authHeader.split(' ')[1];
        // console.log(token);
            if(token){
                jwt.verify(token, process.env.TOKEN_SECRET, (error, user)  =>{
                    if(error){
                        console.log('if error in the token:',error);
                    }
                    // set it tob the decoded value
                    req.user = user;
                    next();
                });   
            }
            else{
                next();
            }
        }
        else{
            next();
        }

}

function isSignedIn(req, res, next){
    console.log('requesting the user: ',req.user);
    if(req.user){
        next();
        console.log('requesting the user: ',req.user);
    }
    else{
        const error = new Error('Unauthorised!');
        res.status(401);
        next(error);
    }
}

module.exports ={
    checkTokenSetUser,
    isSignedIn
}