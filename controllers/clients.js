const clientsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const utils = require('./utils/utils')
const Client = require('../models/client')
const User = require('../models/user')

clientsRouter.get('/', async (request, response) => {
  const token = utils.getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  console.log(decodedToken.id)
  const clients = await Client
    .find({ user: decodedToken.id })
    .populate('user', { username: 1, name: 1 })
  response.json(clients.map(client => client.toJSON()))
})

clientsRouter.get('/:id', async (request, response) => {
  const token = utils.getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  
  const client = await Client.findById(request.params.id)
  if (client.user === decodedToken.id) {
    response.json(client.toJSON())
  } else {
    response.status(404).end()
  }
})

clientsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = utils.getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }
  
  const user = await User.findById(decodedToken.id)
  
  const client = new Client({
    name: body.name,
    address: body.address,
    phone: body.phone,
    email: body.email,
    user: user._id
  })
  
  const savedClient = await client.save()
  user.clients = user.clients.concat(savedClient._id)
  await user.save()
  response.json(savedClient.toJSON())
})

clientsRouter.delete('/:id', async (request, response) => {
    await Client.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = clientsRouter