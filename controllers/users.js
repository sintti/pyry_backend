const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// Create user
usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body
  
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    
    const user = new User({
      username: body.username,
      email: body.email,
      passwordHash
    })
    
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (e) {
    response.status(400).send(`Rekisteröitymisessä tapahtui virhe.`)
  }
})

// Update user info
usersRouter.post('/:id', async (request, response) => {
  try {
    const body = request.body
    
    const newUser = await User.findByIdAndUpdate(body.id, {
      name: body.name,
      address: body.address,
      phone: body.phone,
      company: body.company,
      yTunnus: body.yTunnus
    })
    
    console.log('user information updated succesfully: ', { newUser })

    
  } catch (error) {
    response.status(400).send(`Virhe päivitettäessä käyttäjätietoja: ${error.message}`)
  }
})

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
    .find({})
    .populate('clients', {name: 1, address: 1, phone: 1, email: 1})
    response.json(users.map(u => u.toJSON()))
  } catch (error) {
    res.status(400).send(`Virhe haettaessa käyttäjätietoja: ${error.message}`)
  }
})

usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (e) {
    res.status(400).send(`Virhe haettaessa käyttäjätietoja: ${error.message}`)
  }
})

module.exports = usersRouter
