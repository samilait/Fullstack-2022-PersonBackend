const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB: ', error.message)
  })

const numberValidator = (val) => {
  const arr = val.split('-')
  if (arr.length !== 2) {
    return false
  } else {
    if (arr[0].length + arr[1].length < 8) {
      return false
    }
    if (arr[0].length === 2 || arr.length[0].length === 3) {
      return true
    }
  }

}
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    validate: {
      validator: numberValidator,
      message: 'Number must be at least 8 characters. Number must contain two parts separated with -. 1st part must be either 2 or 3 characters'
    },
  },
  date: Date,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
