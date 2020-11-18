const Client = require('../models/client')

const initialClients = [
  {
    "name": "roope ankka",
    "address": "Ankkalinnanmäki 1, 00100 Ankkalinna",
    "phone": "04012345678",
    "email": "roope@ankkafirmat.fi"
  },
  {
    "name": "aku ankka",
    "address": "Laiskatie 2, 00123 Ankkalinna",
    "phone": "0451235648",
    "email": "aku.ankka@jippikaijei.com"
  },
  {
    "name": "mikki hiiri",
    "address": "Poliisitalo 1, 00300 Ankkalinna",
    "phone": "020456987",
    "email": "mikki.hiiri@ankkapoliisi.fi"
  }
]

const newTestClient = {
  "name": "kikki hiiri",
  "address": "Pierutie 99",
  "phone": "987654111",
  "email": "kikki@hiiri.fi"
}

const clientsInDb = async () => {
  const clients = await Client.find({})
  return clients.map(c => c.toJSON())
}

module.exports = {
  initialClients,
  newTestClient,
  clientsInDb
}