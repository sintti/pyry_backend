const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./testHelper')
const app = require('../app')
const api = supertest(app)
const Client = require('../models/client')

beforeEach(async () => {
  await Client.deleteMany({})
  console.log('Mongo cleared')
  
  let clientObject = new Client(helper.initialClients[0])
  await clientObject.save()
  clientObject = new Client(helper.initialClients[1])
  await clientObject.save()
  clientObject = new Client(helper.initialClients[2])
  await clientObject.save()
})

test('clients are returned as json', async () => {
  await api
    .get('/api/clients')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all clients are returned', async () => {
  const response = await api.get('/api/clients')
  expect(response.body).toHaveLength(helper.initialClients.length)
})

test('a client can be added', async () => {
  await api
    .post
})

afterAll(() => {
  mongoose.connection.close()
})
