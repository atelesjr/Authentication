const Authentication = require('./controllers/authentication')
const passportSevice = require('./services/passport')
const passport = require('passport')

/*passport by default create coockies for sections
and to avoid associate to jwt with session to false */
const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })


module.exports = function(app){
    app.get('/', requireAuth, function(req, res){
        res.send({ message: 'super secret code is 123' })
    })

    app.post('/signin', requireSignin, Authentication.signin)
    app.post('/signup', Authentication.signup)
}

