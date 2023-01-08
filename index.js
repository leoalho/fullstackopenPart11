/* eslint-disable no-unused-vars */
const express = require('express')
var morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Number = require('./models/phonenumbers')
const app = express()

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'))
app.use(cors())
app.use(express.static('frontend/build'))

app.get('/api/persons', (req, res) => {
    Number.find({}).then(notes => {
        res.json(notes)
    })
})

app.post('/api/persons', (req, res, next) => {
    const person = req.body
    
    const number = new Number({
        name: person.name,
        number: person.number
    })
    number.save().then(result =>{
        res.json(number)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const id = req.params.id
    Number.findById(id).then(person => {
        res.json(person)
    }).catch(error => next(error))
})

app.put('/api/persons/:id', (req,res, next)=>{

    const newPerson = {
        name: req.body.name,
        number: req.body.number
    }

    Number.findByIdAndUpdate(req.params.id, newPerson, { new: true, runValidators: true, context: 'query'}).then(result =>{
        res.json(result)
    }
    ).catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res,next) => {
    const id = req.params.id
    Number.findByIdAndRemove(id).then(response => {
        res.status(204).end()
    }).catch(error => next(error))
})

app.get('/info', (req,res) => {
    Number.find({}).then(notes => {
        res.send(`Phonebook has info for ${notes.length} persons<br>${new Date().toUTCString()}`)
    })
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message)
    
    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }
  
    next(error)
}
  
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(new Date().toUTCString())
})
