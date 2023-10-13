import { useState } from 'react'
import axios from 'axios'

const GetCountry = ({country, setCountry, newCountry, setNewCountry}) => {

  const searchCountry = (event) => {
    event.preventDefault()
    const countryObject = newCountry

    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryObject}`)
    .then(response => {
      setCountry(country.concat(response.data))
      console.log(response.data)
      setNewCountry('')
    })
  }

  const handleCountryChange = (event) => {
    //console.log(event.target.value)
    setNewCountry(event.target.value)
  }

  return (
    <div>
      <form onSubmit={searchCountry}> 
        <input
        value={newCountry}
        onChange={handleCountryChange}
        />
        <button type="submit">Search</button>
      </form>
      <h2><p>{country.map(country => country.name.common)}</p></h2>
      <p>{country.map(country => country.capital)}</p>
      <p>{country.map(country => country.area)}</p>
    </div>
  )
}

function App() {
  const [country, setCountry] = useState([])
  const [newCountry, setNewCountry] = useState('Find a country..')

  return (
    <div>
      Maiden tiedot
      <GetCountry country={country} setCountry={setCountry}
      newCountry={newCountry} setNewCountry={setNewCountry}/>
    </div>
  )
}

export default App
