import {useReducer, useEffect} from 'react'
import {Switch, Route, useRouteMatch} from 'react-router-dom'
import loadingReducer from '../../reducer/loadingReducer'
import ChoicePage from './ChoicePage'
import LoginPage from './LogInPage'
import RegisterPage from './RegisterPage'
import ProfilePage from './ProfilePage'
import {loadToken} from '../../services/tokenStorage'

export default function UserPage () {

    const [userData, dispatchUserData] = useReducer(
        loadingReducer,
        {data: [], isLoading: false, isError: false}
      )
    
      useEffect(() => {
        dispatchUserData({type: 'FETCH_INIT'})
        fetch('http://countrycheck.local/user', {
            headers: {
                Authorization: `Bearer ${loadToken()}`
            } 
        })
          .then(response => response.json())
          .then(result => {
              dispatchUserData({
              type: 'FETCH_SUCCESS',
              payload: result
              })
          })
          .catch(() => dispatchUserData({type: 'FETCH_FAILURE'}))
      },[])
    
    return <>
        {userData.isError && <p>An error occurred while fetching data</p>}
        {userData.isLoading ? (<p>Loading...</p>) :
            ((userData.data.hasOwnProperty('loggedIn')? <ChoicePage/>: <p><ProfilePage/></p>))
        }
        <Switch>
            <Route path={`${useRouteMatch().path}/login`}>
                <LoginPage/>
            </Route>
            <Route path={`${useRouteMatch().path}/register`}>
                <RegisterPage/>
            </Route>
        </Switch>
    </>
}