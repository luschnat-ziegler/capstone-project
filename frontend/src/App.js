import {useEffect, useReducer} from 'react'
import {Route, Switch} from 'react-router-dom'
import loadingReducer from './reducer/loadingReducer'

import Home from './components/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import GlobalStyles from "./GlobalStyles"
import UserPage from './components/userpage/UserPage'

function App() {

  const [allCountries, dispatchAllCountries] = useReducer(
    loadingReducer,
    {data: [], isLoading: false, isError: false}
  )
  
  useEffect(() => {
    dispatchAllCountries({type: 'FETCH_INIT'})
    fetch('http://countrycheck.local/countries')
      .then(response => response.json())
      .then(result => {
          dispatchAllCountries({
          type: 'FETCH_SUCCESS',
          payload: result
          })
      })
      .catch(() => dispatchAllCountries({type: 'FETCH_FAILURE'}))
  }, [])

  return (
    <div className="App">
      <GlobalStyles/>
      <Header/>
      <main>
        <Switch>
          <Route exact path="/">
            <Home countries={allCountries}/>
          </Route>
          <Route path="/user" >
            <UserPage/>
          </Route>
        </Switch>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
