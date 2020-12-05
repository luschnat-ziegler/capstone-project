import {useEffect, useReducer, useState} from 'react'
import {Route, Switch} from 'react-router-dom'
import loadingReducer from './reducer/loadingReducer'
import getCountriesAndUser from './services/getCountriesAndUser'
import calcUserScore from './services/calcUserScore'

import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import GlobalStyles from "./GlobalStyles"
import UserPage from './components/userpage/UserPage'

function App() {

  const [countries, dispatchCountries] = useReducer(
    loadingReducer,
    {data: [], isLoading: false, isError: false}
  )

  const [userLogInChange, setUserLogInChange] = useState("toggle")
  
  useEffect(() => {
    dispatchCountries({type: 'FETCH_INIT'})
    getCountriesAndUser()      
    .then(result => {
          dispatchCountries({
          type: 'FETCH_SUCCESS',
          payload: calcUserScore(result)
          })
      })
      .catch(error => dispatchCountries({type: 'FETCH_FAILURE'}))
  }, [userLogInChange])

  return (
    <div className="App">
      <GlobalStyles/>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/">
            <Home data={countries}/>
          </Route>
          <Route path="/user" >
            <UserPage handleStatusChange={setUserLogInChange} status={userLogInChange}/>
          </Route>
        </Switch>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
