import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'
import { useState, useReducer } from 'react'
import postingReducer from '../reducer/postingReducer'
import { postInit, postSuccess, postFailure } from '../actions/postingActions'
import {
  Wrapper,
  ContentContainer,
  Heading,
  SubHeading,
  SubmitButton,
  FailureNotification,
} from '../styles/ReusableComponents'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { deleteToken } from '../services/tokenStorage'
import updateUser from '../services/updateUser'

export default function ProfilePage({ userData, handleStatusChange, status }) {
  const [sliderValues, setSliderValues] = useState({
    weightGender: userData.weightGender === null ? 2 : userData.weightGender,
    weightEnvironment: userData.weightEnvironment === null ? 2 : userData.weightEnvironment,
    weightLgbtq: userData.weightLgbtq === null ? 2 : userData.weightLgbtq,
    weightCorruption: userData.weightCorruption === null ? 2 : userData.weightCorruption,
    weightEquality: userData.weightEquality === null ? 2 : userData.weightEquality,
    weightFreedom: userData.weightFreedom === null ? 2 : userData.weightFreedom,
  })

  const [updateStatus, dispatchUpdateStatus] = useReducer(postingReducer, {
    isPosting: false,
    isError: false,
  })

  return (
    <Wrapper>
      <HorizontalFlexContainer>
        <Heading>Your Profile</Heading>
        <LogOutButton onClick={logOut}>Log me out!</LogOutButton>
      </HorizontalFlexContainer>
      <ContentContainer>
        <ProfileInfoContainer>
          <p>
            {userData.firstName} {userData.lastName}
          </p>
          <p>{userData.email}</p>
        </ProfileInfoContainer>
      </ContentContainer>
      <ContentContainer>
        {updateStatus.isPosting ? (
          <LoaderContainerProfile>
            <Loader type="ThreeDots" color="grey" height={100} width={100} timeout={3000} />
          </LoaderContainerProfile>
        ) : (
          <SliderFlexContainer>
            <SubHeading>Slide to adjust your priority settings:</SubHeading>
            <BarLegend>Environment and Climate</BarLegend>
            <Slider
              min={0}
              max={4}
              defaultValue={userData.weightEnvironment === null ? 2 : userData.weightEnvironment}
              onChange={(event) => onSliderChange(event, 'weightEnvironment')}
            />
            <BarLegend>Gender Equality</BarLegend>
            <Slider
              min={0}
              max={4}
              defaultValue={userData.weightGender === null ? 2 : userData.weightGender}
              onChange={(event) => onSliderChange(event, 'weightGender')}
            />
            <BarLegend>LGBTQ-Acceptance</BarLegend>
            <Slider
              min={0}
              max={4}
              defaultValue={userData.weightLgbtq === null ? 2 : userData.weightLgbtq}
              onChange={(event) => onSliderChange(event, 'weightLgbtq')}
            />
            <BarLegend>Freedom and Democracy</BarLegend>
            <Slider
              min={0}
              max={4}
              defaultValue={userData.weightFreedom === null ? 2 : userData.weightFreedom}
              onChange={(event) => onSliderChange(event, 'weightFreedom')}
            />
            <BarLegend>Corruption Control</BarLegend>
            <Slider
              min={0}
              max={4}
              defaultValue={userData.weightCorruption === null ? 2 : userData.weightCorruption}
              onChange={(event) => onSliderChange(event, 'weightCorruption')}
            />
            <BarLegend>Income Equality</BarLegend>
            <Slider
              min={0}
              max={4}
              defaultValue={userData.weightEquality === null ? 2 : userData.weightEquality}
              onChange={(event) => onSliderChange(event, 'weightEquality')}
            />
            <SubmitButton onClick={submitPrefs}>Submit!</SubmitButton>
            {updateStatus.isError && <FailureNotification>Please try again.</FailureNotification>}
          </SliderFlexContainer>
        )}
      </ContentContainer>
    </Wrapper>
  )

  function onSliderChange(value, entry) {
    setSliderValues({
      ...sliderValues,
      [entry]: value,
    })
  }

  function submitPrefs() {
    dispatchUpdateStatus({ type: postInit })
    updateUser(sliderValues)
      .then((data) => {
        if (data.loggedIn === false) {
          dispatchUpdateStatus({ type: postFailure })
          handleStatusChange(status === 'toggle' ? 'untoggle' : 'toggle')
        } else {
          dispatchUpdateStatus({ type: postSuccess })
          alert('Update complete')
          handleStatusChange(status === 'toggle' ? 'untoggle' : 'toggle')
        }
      })
      .catch(() => dispatchUpdateStatus({ type: postFailure }))
  }

  function logOut() {
    deleteToken()
    handleStatusChange(status === 'toggle' ? 'untoggle' : 'toggle')
  }
}

const HorizontalFlexContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const ProfileInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SliderFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const BarLegend = styled.p`
  color: #606060;
  padding-top: 15px;
  padding-bottom: 5px;
`

const LogOutButton = styled.button`
  border: none;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  width: 100px;
  height: 30px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  color: white;
  background-color: grey;
  padding: 4px;
`

const LoaderContainerProfile = styled.div`
  padding-top: 20vh;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`

ProfilePage.propTypes = {
  handleStatusChange: PropTypes.func,
  status: PropTypes.string,
  userData: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
}
