const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const body = request.body
  console.log('body: ', body)
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
  const user = new User({
    username: body.username,
    email: body.email,
    passwordHash
  })
  
  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (e) {
    response.status(400).send(`Rekisteröitymisessä tapahtui virhe.`)
  }
})

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User
    .find({})
    .populate('clients', {name: 1, address: 1, phone: 1, email: 1})
    response.json(users.map(u => u.toJSON()))
  } catch (error) {
    res.status(400).send('Virhe haettaessa käyttäjätietoja.')
  }
})

usersRouter.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (e) {
    res.status(400).send('Virhe haettaessa käyttäjätietoja.')
  }
})

module.exports = usersRouter
