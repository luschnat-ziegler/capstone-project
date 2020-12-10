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

  const [userLogInChange, setUserLogInChange] = useState('toggle')

  useEffect(() => {
    dispatchCountriesAndUser({ type: fetchInit })
    getCountriesAndUser()
      .then((result) => {
        dispatchCountriesAndUser({
          type: fetchSuccess,
          payload: calcUserScore(result),
        })
      })
      .catch(() => dispatchCountriesAndUser({ type: fetchFailure }))
  }, [userLogInChange])

  return (
    <div>
      <GlobalStyles />
      <Header />
      <main>
        <Switch>
          <Route exact path="/">
            <Home countries={countriesAndUser} />
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
