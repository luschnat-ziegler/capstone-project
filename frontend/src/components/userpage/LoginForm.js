import { useReducer } from 'react'
import styled from 'styled-components/macro'
import useForm from '../../hooks/useForm'
import postingReducer from '../../reducer/postingReducer'
import { postInit, postSuccess, postFailure } from '../../actions/postingActions'
import {
  FormInput,
  FlexForm,
  SubmitButton,
  FailureNotification,
} from '../../styles/ReusableComponents'
import { validateEmail } from '../../services/validations'
import logInUser from '../../services/logInUser'
import { saveToken } from '../../services/tokenStorage'
import PropTypes from 'prop-types'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

export default function LoginForm({ handleStatusChange, status }) {
  const [loginStatus, dispatchLoginStatus] = useReducer(postingReducer, {
    isPosting: false,
    isError: false,
  })

  const { inputs, handleInputChange, handleSubmit } = useForm(
    { email: '', password: '' },
    submitForm
  )

  return (
    <>
      {loginStatus.isPosting ? (
        <LoaderContainerLogin>
          <Loader type="ThreeDots" color="grey" height={80} width={80} timeout={6000} />
        </LoaderContainerLogin>
      ) : (
        <>
          <FlexForm onSubmit={handleSubmit}>
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
              placeholder={'Password'}
            />
            <SubmitButton>Log In</SubmitButton>
          </FlexForm>
          {loginStatus.isError && <FailureNotification>Please try again</FailureNotification>}
        </>
      )}
    </>
  )

  function submitForm() {
    dispatchLoginStatus({ type: postInit })
    if (validateEmail(inputs.email)) {
      logInUser(inputs).then((data) => {
        if (data.success === false) {
          dispatchLoginStatus({ type: postFailure })
        } else {
          saveToken(data.value)
          dispatchLoginStatus({ type: postSuccess })
          handleStatusChange(status === 'toggle' ? 'untoggle' : 'toggle')
        }
      })
    } else {
      dispatchLoginStatus({ type: postFailure })
    }
  }
}

LoginForm.propTypes = {
  handleStatusChange: PropTypes.func,
  status: PropTypes.string,
}

const LoaderContainerLogin = styled.div`
  padding-top: 4vh;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`
