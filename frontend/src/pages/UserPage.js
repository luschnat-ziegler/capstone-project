import {useReducer, useEffect} from 'react'
import loadingReducer from '../reducer/loadingReducer'
import getUser from '../services/getUser'
import ProfilePage from './ProfilePage'
import NotLoggedInPage from './NotLoggedInPage'
import PropTypes from 'prop-types'

export default function UserPage ({handleStatusChange, status}) {

    const [userData, dispatchUserData] = useReducer(
        loadingReducer,
        {data: [], isLoading: false, isError: false}
      )
        
      useEffect(() => {
        dispatchUserData({type: 'FETCH_INIT'})
        getUser()
          .then(result => {
              dispatchUserData({
              type: 'FETCH_SUCCESS',
              payload: result
              })
          })
          .catch(() => dispatchUserData({type: 'FETCH_FAILURE'}))
      },[status])
    
    return <>
        {userData.isError && <p>An error occurred while fetching data</p>}
        {userData.isLoading ? (<p>Loading...</p>) :
            ((userData.data.hasOwnProperty('loggedIn')? 
                <NotLoggedInPage 
                    handleStatusChange={handleStatusChange} 
                    status={status}
                />:
                <ProfilePage 
                    userData={userData.data} 
                    handleStatusChange={handleStatusChange} 
                    status={status}
                />))
        }
    </>
}

UserPage.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string
}