const workRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const utils = require('./utils/utils')
const Work = require('../models/work')
const User = require('../models/user')
const Client = require('../models/client')

workRouter.get('/', async (request, response) => {
  const work = await Work
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(work.map(w => w.toJSON()))
})

workRouter.get('/:id', async (request, response) => {
  const work = await Work.findById(request.params.id)
  if (work) {
    response.json(work.toJSON())
  } else {
    response.status(404).end()
  }
})

workRouter.post('/', async (request, response) => {
  const body = request.body
  const token = utils.getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
  if (!token || !decodedToken.id) {
    return response.status(401).json({
      error: 'token missing or invalid'
    })
  }

  const user = await User.findById(decodedToken.id)
  const client = await Client.findOne({ name: body.client })
  
  const work = new Work({
    hours: body.hours,
    trip: body.trip,
    date: body.date,
    client: client._id,
    user: user._id
  })
  
  const savedWork = await work.save()
  console.log('client: ', client)
  console.log('savedWork: ', savedWork)
  client.work = client.work.concat(savedWork._id)
  await client.save()
  response.json(savedWork.toJSON())   
})

module.exports = workRouter