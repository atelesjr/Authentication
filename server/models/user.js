const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

// Definea our model
const userSchema = new Schema({
    email: { type: String, unique: true, lowercase: true },
    password: String
})

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next){
    //get access to the user model
    const user = this;

    /* When saving a passw, it generate a SALT
    - A SALT is a string of characters or randomly generate
     a sting of characters by combining with a plain passw
     it gets a SALT + HASSHED passw */
    bcrypt.genSalt(10, function(err, salt){
       if (err) {return next(err)}
        //hash (encrypt) our password using the salt
       bcrypt.hash(user.password, salt, null, function(err, hash){
           if(err){ return next(err) }
           // overwrite plain text password with encrypt password
           user.password = hash
           next()
       })
    })
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) { return callback(err) }

        callback(null,isMatch)
    })

}

// Create the model class
const modelClass = mongoose.model('user', userSchema )


// export the model
module.exports = modelClass