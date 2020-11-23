import {useEffect, useReducer} from 'react'
import countriesReducer from './reducer/countriesReducer'
import Select from 'react-select'

import Header from './components/Header'

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function App() {

  const [countries, setCountries] = useReducer(
    countriesReducer,
    {data: [], isLoading: false, isError: false}
  )
  
  useEffect(() => {
    setCountries({type: 'COUNTRIES_FETCH_INIT'})
    fetch('http://countrycheck.local/countries')
      .then(response => response.json())
      .then(result => {
          setCountries({
          type: 'COUNTRIES_FETCH_SUCCESS',
          payload: result
          })
      })
      .catch(() => setCountries({type: 'COUNTRIES_FETCH_FAILURE'}))
  }, [])

  return (
    <div className="App">
      <Header/>
     {countries.isError ?? <p>An error occurred while fetching data</p>}
     {countries.isLoading ? <p>Loading...</p> : <Select options={countries.data.map(country => ({value: country.id, label: country.country}))} />}
    </div>
  );
}

export default App;
