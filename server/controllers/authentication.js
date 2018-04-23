const jwt = require('jwt-simple')
const User = require('../models/user')
const config = require('../config')

function tokenForUser(user){
    const timestamp = new Date().getTime()
    //sub - subject is user.id to encode to config.secret
    //iat - issue at time
    return jwt.encode({ sub: user.id, iat: timestamp }, config.secret)
}

exports.signin = function(req, res, next){
    //user has already had ther email ans passw authorized
    // It just need to give a token
    res.send( { token: tokenForUser(req.user) })
}

exports.signup = function (req, res, next){
    const email = req.body.email
    const password = req.body.password

    if (!email || !password){
        return res.status(422).send({error: 'You must provide e-mail and password'})
    }

    //See if a user with the given email exists
    User.findOne({ email: email }, function(err, existingUser) {
        if(err) { return next (err)}

        // If a user with e-mail does exist, return an error
        if (existingUser){
            return res.status(422).send({
                error: 'E-mail is in use'
            })
        }
        
        // If a user with e-mail DOESN'T exist, create and save user record
        const user = new User ({
            email: email,
            password: password
        })

        user.save(function(err){
            if (err) { return next(err) }

            // Respond to request indicating the user was created
            res.json({ token: tokenForUser(user) })
        })
    })
}