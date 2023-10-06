import { useState } from 'react'

const PersonForm = ({ persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => {
  //console.log(persons)

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    //console.log(persons.map(person => person.name).includes(newName))
    if (persons.map(person => person.name).includes(newName)) {
      console.log('Duplicate', newName)
      alert(`${newName} is already added to phonebook`)
    }
    else {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
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

const PersonList = ({ persons }) => {
  //console.log(persons)
  return (
    <div>
      <ul>
        {persons.map(person =>
          <li key={person.id}>
            {person.name} {person.number}
          </li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1236548',
      id: 1
    },
    {
      name: 'Matti Meikalainen',
      number: '058-65866644',
      id: 2
    },
    {
      name: 'Seppo Maaly',
      number: '04-85994543',
      id: 3
    }

  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2>Numbers</h2>
      <PersonList persons={persons} />
    </div>
  )

}

export default App