const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]
  
const url =`mongodb+srv://fullstack:${password}@fullstack.cecrwrg.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(url)

const numberSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Number = mongoose.model('Number', numberSchema)

if (process.argv.length === 3){
    Number.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(note => {
            console.log(`${note.name} ${note.phonenumber}`)
        })
        mongoose.connection.close()
    })
}else{
    const number = new Number({
        name: process.argv[3],
        number: process.argv[4]
    })

    number.save().then(result => {
        console.log(`added ${result.name} number ${result.phonenumber} to phonebook`)
        mongoose.connection.close()
    })
}