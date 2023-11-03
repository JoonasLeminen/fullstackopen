const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
require('dotenv').config()

const Person = require('./models/person')

morgan.token('person', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = []

app.get('/', (request, response) => {
    response.send('<h1>Persons backend</h1>')
})

app.get('/info', (request, response) => {
    const timeDate = new Date();
    response.send(`Phonebook has ${Math.max(...persons.map(n => n.id))} people listed currently
    <br><br>${timeDate}`)
})

app.get('/api/persons', (request, response) => {
    Person.find({})
        .then(persons => {
            response.json(persons)
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

/*const generateID = () => {
    const createId = Math.floor(Math.random() * 999)
    return createId
}*/

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'Name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'Number missing'
        })
    }

    /*if (persons.map(person => person.name).includes(body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }*/

    Person.find({})
        .then(persons => {
            if (persons.map(person => person.name).includes(body.name)) {

                console.log("sama nimi!")
                response.status(400).end()

            } else {

                const person = new Person({
                    name: body.name,
                    number: body.number,
                })

                person.save().then(savedPerson => {
                    response.json(savedPerson)
                })
            }
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)