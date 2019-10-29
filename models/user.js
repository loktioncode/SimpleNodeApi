const mongoose = require('mongoose')

//this is how we define our user schema
const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
      },
    email: {
        type: String,
        required: true
      },
    signupDate: {
        type: Date,
        required: true,
        default: Date.now()
      }

})


// exporting our user schema
module.exports = mongoose.model('User', userSchema)  //User is the name we want to give the model in DB
