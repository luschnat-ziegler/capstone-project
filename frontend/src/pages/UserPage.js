import { useReducer, useEffect } from 'react'
import loadingReducer from '../reducer/loadingReducer'
import { fetchInit, fetchSuccess, fetchFailure } from '../actions/loadingActions'
import getUser from '../services/getUser'
import ProfilePage from './ProfilePage'
import NotLoggedInPage from './NotLoggedInPage'
import PropTypes from 'prop-types'

export default function UserPage({ handleStatusChange, status }) {
  const [userData, dispatchUserData] = useReducer(loadingReducer, {
    data: [],
    isLoading: false,
    isError: false,
  })

  useEffect(() => {
    dispatchUserData({ type: fetchInit })
    getUser()
      .then((result) => {
        dispatchUserData({
          type: fetchSuccess,
          payload: result,
        })
      })
      .catch(() => dispatchUserData({ type: fetchFailure }))
  }, [status])

  return (
    <>
      {userData.isError && <p>An error occurred while fetching data</p>}
      {userData.isLoading ? (
        <p>Loading...</p>
      ) : userData.data.hasOwnProperty('loggedIn') ? (
        <NotLoggedInPage handleStatusChange={handleStatusChange} status={status} />
      ) : (
        <ProfilePage
          userData={userData.data}
          handleStatusChange={handleStatusChange}
          status={status}
        />
      )}
    </>
  )
}

UserPage.propTypes = {
  handleStatusChange: PropTypes.func,
  status: PropTypes.string,
}
