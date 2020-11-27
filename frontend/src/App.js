import {useEffect, useReducer, useState} from 'react'
import countriesReducer from './reducer/countriesReducer'

import Header from './components/Header'
import Footer from './components/Footer'
import CountryDropdowns from './components/CountryDropdowns'
import SymmetricCountryChart from './components/SymmetricCountryChart'
import GlobalStyles from "./GlobalStyles";

function App() {

  const [countries, setCountries] = useReducer(
    countriesReducer,
    {data: [], isLoading: false, isError: false}
  )
  
  const [displayedCountries, setDisplayedCountries] = useState({
    countryLeft: {},
    countryRight: {}
  })
  
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
      <GlobalStyles/>
      <Header/>
     {countries.isError && <p>An error occurred while fetching data</p>}
     {countries.isLoading ?
        (<p>Loading...</p>) : 
        (<>
        <CountryDropdowns 
          handleDisplayedCountries = {setDisplayedCountries} 
          displayedCountries = {displayedCountries}
          countries = {countries.data}
          />
        <SymmetricCountryChart countries={displayedCountries}/>
        </>)}
      <Footer/>
    </div>
  );
}

export default App;
