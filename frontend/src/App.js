import { useEffect, useReducer, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import loadingReducer from './reducer/loadingReducer'
import { fetchInit, fetchSuccess, fetchFailure } from './actions/loadingActions'
import getCountriesAndUser from './services/getCountriesAndUser'
import calcUserScore from './services/calcUserScore'

import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import GlobalStyles from './styles/GlobalStyles'
import UserPage from './pages/UserPage'

function App() {
  const [countriesAndUser, dispatchCountriesAndUser] = useReducer(loadingReducer, {
    data: [],
    isLoading: false,
    isError: false,
  })

  const [displayedCountries, setDisplayedCountries] = useState({
    countryLeft: {},
    countryRight: {},
  })

  const [userLogInChange, setUserLogInChange] = useState('toggle')

  useEffect(() => {
    dispatchCountriesAndUser({ type: fetchInit })
    getCountriesAndUser()
      .then((result) => {
        const data = calcUserScore(result)
        dispatchCountriesAndUser({
          type: fetchSuccess,
          payload: data,
        })
        setDisplayedCountries({
          countryLeft: displayedCountries.countryLeft.id
            ? data[0].find((country) => country.id === displayedCountries.countryLeft.id)
            : {},
          countryRight: displayedCountries.countryRight.id
            ? data[0].find((country) => country.id === displayedCountries.countryRight.id)
            : {},
        })
      })
      .catch(() => dispatchCountriesAndUser({ type: fetchFailure }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userLogInChange])

  return (
    <div>
      <GlobalStyles />
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home
              countries={countriesAndUser}
              shownCountries={displayedCountries}
              handleShownCountries={setDisplayedCountries}
            />
          </Route>
          <Route path="/user">
            <UserPage handleStatusChange={setUserLogInChange} status={userLogInChange} />
          </Route>
        </Switch>
      </main>
      <Footer />
    </div>
  )
}

export default App
