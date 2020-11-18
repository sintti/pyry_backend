const mongoose = require('mongoose')

const workSchema = new mongoose.Schema({
  id: Number,
  hours: Number,
  trip: Number,
  date: Date,
  // client: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Client'
  // },
  client: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

workSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Work', workSchema)