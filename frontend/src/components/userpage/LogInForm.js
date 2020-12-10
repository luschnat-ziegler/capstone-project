import { useReducer} from 'react'
import useForm from '../../hooks/useForm'
import postingReducer from '../../reducer/postingReducer'
import {
    FormInput, 
    FlexForm,
    SubmitButton,
    FailureNotification
} from '../../styles/ReusableComponents'
import {validateEmail} from '../../services/validations'
import logInUser from '../../services/logInUser'
import {saveToken} from '../../services/tokenStorage'
import PropTypes from 'prop-types'

export default function LoginForm({handleStatusChange, status}) {

    const [loginStatus, dispatchLoginStatus] = useReducer(
        postingReducer,
        {isPosting: false, isError: false}
      )

    const {inputs, handleInputChange, handleSubmit} = useForm(
        {email: "", password: ""},
        submitForm)

    return (
        <>
        {loginStatus.isPosting ? <p>Loading. Please wait...</p> : <>
        <FlexForm onSubmit={handleSubmit}>
                <FormInput 
                    type="text" 
                    name="email" 
                    onChange={handleInputChange} 
                    value={inputs.email}
                    placeholder={"E-Mail"}
                />
                <FormInput 
                    type="password" 
                    name="password" 
                    onChange={handleInputChange} 
                    value={inputs.password}
                    placeholder={"Password"}
                />
                <SubmitButton>Log In</SubmitButton>
            </FlexForm>
            {loginStatus.isError && <FailureNotification>Please try again</FailureNotification>}</>}
        </>)

    function submitForm() {
        dispatchLoginStatus({type: 'POST_INIT'})
        if(validateEmail(inputs.email)) {
        logInUser(inputs)
        .then(data => {
            if (data.success === false) {
                dispatchLoginStatus({type: 'POST_FAILURE'})
            } else {
                saveToken(data.value)
                dispatchLoginStatus({type: 'POST_SUCCESS'})
                handleStatusChange(status === "toggle" ? "untoggle" : "toggle")
            }
        })
        } else {
            dispatchLoginStatus({type: 'POST_FAILURE'})
        }
    }
}

LoginForm.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string
}