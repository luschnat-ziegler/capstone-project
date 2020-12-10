import { useState } from 'react'
import CountryDropdowns from '../components/homepage/CountryDropdowns'
import SymmetricCountryChart from '../components/homepage/SymmetricCountryChart'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { LoaderContainer } from '../styles/ReusableComponents'

export default function Home({ countries }) {
  const [displayedCountries, setDisplayedCountries] = useState(
    {
      countryLeft: {},
      countryRight: {},
    },
    []
  )

  return (
    <>
      {countries.isError && <p>An error occurred while fetching data</p>}
      {countries.isLoading ? (
        <LoaderContainer>
          <Loader type="ThreeDots" color="grey" height={100} width={100} timeout={3000} />
        </LoaderContainer>
      ) : (
        <>
          <CountryDropdowns
            handleDisplayedCountries={setDisplayedCountries}
            displayedCountries={displayedCountries}
            countries={countries.data.length === 0 ? countries.data : countries.data[0]}
          />
          <SymmetricCountryChart
            countries={displayedCountries}
            displayOptions={
              countries.data.length === 0 ? { user: false, custom: false } : countries.data[2]
            }
          />
        </>
      )}
    </>
  )
}

Home.propTypes = {
  data: PropTypes.object,
}
