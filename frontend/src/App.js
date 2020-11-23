import {useEffect, useReducer} from 'react'
import countriesReducer from './reducer/countriesReducer'


const API_ENDPOINT = 'http://countrycheck.local/countries'

function App() {

  const [countries, setCountries] = useReducer(
    countriesReducer,
    {data: [], isLoading: false, isError: false}
  )
  
  useEffect(() => {
    setCountries({type: 'COUNTRIES_FETCH_INIT'})

    fetch(API_ENDPOINT)
      .then(response => response.json())
      .then(result => {
        console.log(result)
        setCountries({
          type: 'COUNTRIES_FETCH_SUCCESS',
          payload: result
        })
      })
      .catch(() => setCountries({type: 'COUNTRIES_FETCH_FAILURE'}))
  }, [])

  return (
    <div className="App">
     {countries.isError ?? <p>An error occurred while fetching data</p>}
     {countries.isLoading ? <p>Loading...</p> : <p>Data fetched</p>}
    </div>
  );
}

export default App;
