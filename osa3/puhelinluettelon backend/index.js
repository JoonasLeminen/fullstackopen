require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

morgan.token('person', (request, response) => {
    return JSON.stringify(request.body)
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))
app.use(cors())
app.use(express.static('dist'))

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
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

/*const generateID = () => {
    const createId = Math.floor(Math.random() * 999)
    return createId
}*/

app.post('/api/persons', (request, response) => {
    const body = request.body

    /*if (!body.name) {
        return response.status(400).json({
            error: 'Name missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'Number missing'
        })
    }

    if (persons.map(person => person.name).includes(body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }*/

    const person = new Person ({
        name: body.name,
        number: body.number,
    })
    
    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT)
console.log(`Server running on port ${PORT}`)