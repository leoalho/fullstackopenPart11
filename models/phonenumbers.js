const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to', url)
mongoose.connect(url)
    .then(result => {    console.log('connected to MongoDB')  })
    .catch((error) => {    console.log('error connecting to MongoDB:', error.message)  })

function validator(val){
    const osat = val.split('-')
    if (osat.length !== 2){
        return false
    }
    if (osat[0].length !== 2 && osat[0].length !== 3){
        return false
    }
    console.log(val.length>8)
    return (val.length>8)
}

//const custom = [validator, 'Phonenumber wrong']

const numberSchema = new mongoose.Schema({
    name:{
        type: String,
        minlength: 5,
        required: true
    },
    number:{
        type: String,
        validate: validator,
        required: true
    }
})

numberSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Number', numberSchema)