import CountryDropdowns from '../components/homepage/CountryDropdowns'
import SymmetricCountryChart from '../components/homepage/SymmetricCountryChart'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { LoaderContainer } from '../styles/ReusableComponents'

export default function Home({ countries, shownCountries, handleShownCountries }) {
  return (
    <>
      {countries.isError && <p>An error occurred while fetching data</p>}
      {countries.isLoading ? (
        <LoaderContainer>
          <Loader type="ThreeDots" color="grey" height={80} width={80} timeout={6000} />
        </LoaderContainer>
      ) : (
        <>
          <CountryDropdowns
            handleDisplayedCountries={handleShownCountries}
            displayedCountries={shownCountries}
            countries={countries.data.length === 0 ? countries.data : countries.data[0]}
          />
          <SymmetricCountryChart
            countries={shownCountries}
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
