import {useState} from 'react'
import CountryDropdowns from './CountryDropdowns'
import SymmetricCountryChart from './SymmetricCountryChart'


export default function Home ({data}) {

    const [displayedCountries, setDisplayedCountries] = useState({
        countryLeft: {},
        countryRight: {}
      })

      return (<>
      {data.isError && <p>An error occurred while fetching data</p>}
      {data.isLoading ?
         (<p>Loading...</p>) : 
         (<>
         <CountryDropdowns 
           handleDisplayedCountries = {setDisplayedCountries} 
           displayedCountries = {displayedCountries}
           countries = {data.data.length === 0 ? data.data : data.data[0]}
           />
         <SymmetricCountryChart 
          countries={displayedCountries}
          displayOptions={data.data.length === 0 ? {user: false, custom: false} : data.data[2]} 
          />
         </>)}
         </>
      )
}