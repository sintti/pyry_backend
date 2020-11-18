const mongoose = require('mongoose')

const clientSchema = new mongoose.Schema({
  id: Number,
  name: String,
  address: String,
  phone: String,
  email: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  work: {
    type: mongoose.Schema.Types.ObjectId,
    red: 'Work'
  }
})

clientSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Client', clientSchema)