//the server.js should handle the data when it receives a GET, POST or PATCH request.
const express = require('express')
const router = express.Router()

//now we connect our route to our model
const User = require('../models/user')

// Get all users
router.get('/', async (req, res) => {

    try {
        const users = await User.find()
        res.json(users)   //converting result from db schema as JSON

    } catch (err) {

        res.status(500).json({ message: err.message })
    }
})


// Create one user
router.post('/', async (req, res) => {

    const user = new User({  //creating new User object
        name: req.body.name,
        email: req.body.email
    })

    try {
        const newUser = await user.save() 
        res.status(201).json(newUser)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }

})


// Get one user
router.get('/:id', getUserById, (req, res) => {
    res.json(res.user)
})


// Update one user
router.patch('/:id', getUserById ,async (req, res) => {

    if (req.body.name != null) {
        //We’re setting our users’s name from res.name from our middleware thts running
        //and setting the name now equal to the new name that the user passed in from their request.
        res.user.name = req.body.name
      }
    
      if (req.body.email != null) {
        //We’re setting our users’s email from res.user from our middleware thts running (req.body.name)
        //and setting the email now equal to the new email that the user passed in from their request(req.body.email).
        res.user.email = req.body.email
      }
      try {
        const userUpdate = await res.user.save()
        res.json(userUpdate)
      } catch {
        res.status(400).json({ message: err.message })
      }
})


// Delete one user
router.delete('/:id', getUserById, async (req, res) => {
    try {
        await res.user.remove()
        res.json({ message: 'Deleted This Subscriber' })
      } catch(err) {
        res.status(500).json({ message: err.message })
      }

})


// the function below will act as middleware for the last routes that take in Id to look for user with that ID in DB
async function getUserById(req, res, next) {
    try {
      user = await User.findById(req.params.id) //finding user in Db by id passed
      if (user == null) {
        return res.status(404).json({ message: 'Cant find subscriber'})
      }
    } catch(err){
      return res.status(500).json({ message: err.message })
    }
  
    res.user = user  //is setting a variable on the response object which is equal to our user object
    next()  //executes to tell the getUserById function to move onto the actual request.
  }
  


module.exports = router
