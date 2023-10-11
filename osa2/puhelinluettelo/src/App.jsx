import { useState, useEffect } from 'react'
import noteService from './services/persons'

const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => {

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    if (persons.map(person => person.name).includes(newName)) {
      console.log('Duplicate', newName)
      alert(`${newName} is already added to phonebook`)
    }
    else {
      noteService
        .create(nameObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    //console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Add a new</h2>
      <form onSubmit={addName}>
        <div>
          name:
          <input
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

const PersonList = ({ persons, setPersons }) => {

  const PersonDelete = (id) => {
    console.log(`Deleting user ${id}`)

    if (window.confirm(`Really delete?`)) {
      noteService
        .deletePerson(id)

      noteService
        .getAll()
        .then(response => {
          console.log(response.data)
          setPersons(response.data)
        })
    }
  }

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        console.log('GET', response.data)
        setPersons(response.data)
      })
  }, [])

  return (
    <div>
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
            <button onClick={() =>
              PersonDelete(person.id)}>
              Delete
            </button>
          </li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <PersonList persons={persons} setPersons={setPersons} />
    </div>
  )

}

export default App