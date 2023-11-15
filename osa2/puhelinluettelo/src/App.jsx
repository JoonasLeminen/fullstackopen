import { useState, useEffect } from 'react'
import noteService from './services/persons'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className='message'>
      {message}
    </div>
  )
}

const PersonForm = ({ setMessage, persons, newName, newNumber, setPersons, setNewName, setNewNumber }) => {

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber,
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
          setMessage(
            `Person '${nameObject.name}' added to phonebook`
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
        .catch(error => {setMessage(error.response.data.error)})
        setTimeout(() => {
          setMessage(null)
        }, 3000)
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

const PersonList = ({ setMessage, persons, setPersons }) => {

  const PersonDelete = (id) => {
    console.log(`Deleting user ${id}`)

    if (window.confirm('Really delete?')) {
      noteService
        .deletePerson(id)

      noteService
        .getAll()
        .then(response => {
          console.log(response.data)
          refreshList()
          setMessage(
            'Person deleted from phonebook'
          )
          setTimeout(() => {
            setMessage(null)
          }, 3000)
        })
    }
  }
  
  const refreshList = () => {
    noteService
    .getAll()
    .then(response => {
      setPersons(response.data)
      console.log("list refreshed")
    })
  }

  useEffect(() => {
    noteService
      .getAll()
      .then(response => {
        //console.log('GET', response.data)
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
  const [message, setMessage] = useState(null)

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} setMessage={setMessage} />
      <PersonForm persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        newNumber={newNumber} setNewNumber={setNewNumber}
        setMessage={setMessage} />
      <h2>Numbers</h2>
      <PersonList persons={persons} setPersons={setPersons}
        setMessage={setMessage} />
    </div>
  )

}

export default App