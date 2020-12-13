import { useReducer } from 'react'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import postingReducer from '../../reducer/postingReducer'
import { postInit, postSuccess, postFailure } from '../../actions/postingActions'
import {
  FlexForm,
  SubmitButton,
  FailureNotification,
  FormInput,
} from '../../styles/ReusableComponents'
import { validateRegistration } from '../../services/validations'
import { createUser } from '../../services/createUser'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export default function RegisterForm({ setRegistrationOption }) {
  const [registrationStatus, dispatchRegistrationStatus] = useReducer(postingReducer, {
    isPosting: false,
    isError: false,
  })

  const { inputs, handleInputChange, handleSubmit } = useForm(
    {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
    submitForm
  )

  return (
    <>
      {registrationStatus.isPosting ? (
        <LoaderContainerRegistration>
          <Loader type="ThreeDots" color="grey" height={80} width={80} timeout={6000} />
        </LoaderContainerRegistration>
      ) : (
        <>
          <FlexForm onSubmit={handleSubmit}>
            <FormInput
              type="text"
              name="firstName"
              onChange={handleInputChange}
              value={inputs.firstName}
              placeholder={'First Name'}
            />
            <FormInput
              type="text"
              name="lastName"
              onChange={handleInputChange}
              value={inputs.lastName}
              placeholder={'Last Name'}
            />
            <FormInput
              type="text"
              name="email"
              onChange={handleInputChange}
              value={inputs.email}
              placeholder={'E-Mail'}
            />
            <FormInput
              type="password"
              name="password"
              onChange={handleInputChange}
              value={inputs.password}
              placeholder="Password"
            />
            <SubmitButton>Register</SubmitButton>
          </FlexForm>
          {registrationStatus.isError && (
            <FailureNotification>Please try again</FailureNotification>
          )}
        </>
      )}
    </>
  )

  function submitForm() {
    dispatchRegistrationStatus({ type: postInit })
    if (validateRegistration(inputs)) {
      createUser(inputs).then((data) => {
        if (data.success === false) {
          dispatchRegistrationStatus({ type: postFailure })
        } else {
          dispatchRegistrationStatus({ type: postSuccess })
          setRegistrationOption(false)
        }
      })
    } else {
      dispatchRegistrationStatus({ type: postFailure })
    }
  }
}

const LoaderContainerRegistration = styled.div`
  padding-top: 6vh;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`

RegisterForm.propTypes = {
  handleStatusChange: PropTypes.func,
  status: PropTypes.string,
}
