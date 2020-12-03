import {useState} from 'react'
import CountryDropdowns from './CountryDropdowns'
import SymmetricCountryChart from './SymmetricCountryChart'


export default function Home ({countries}) {

    const [displayedCountries, setDisplayedCountries] = useState({
        countryLeft: {},
        countryRight: {}
      })

      return (<>
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
         </>
      )
}