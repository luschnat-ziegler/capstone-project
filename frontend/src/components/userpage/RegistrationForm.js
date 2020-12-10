import { useReducer } from 'react'
import useForm from '../../hooks/useForm'
import postingReducer from '../../reducer/postingReducer'
import { 
    FlexForm,
    SubmitButton, 
    FailureNotification,
    FormInput
} from '../../styles/ReusableComponents'
import { validateRegistration } from '../../services/validations'
import { createUser } from '../../services/createUser'
import PropTypes from 'prop-types'
 
export default function RegisterForm ({setRegistrationOption}) {

    const [registrationStatus, dispatchRegistrationStatus] = useReducer(
        postingReducer,
        {isPosting: false, isError: false}
      )

    const {inputs, handleInputChange, handleSubmit} = useForm({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    }, submitForm)

    return (<>
        {registrationStatus.isPosting ? <p>Loading. Please wait...</p> : <>
        <FlexForm onSubmit={handleSubmit}>
            <FormInput 
                type="text" 
                name="firstName" 
                onChange={handleInputChange} 
                value={inputs.firstName}
                placeholder={"First Name"}
            />
            <FormInput 
                type="text" 
                name="lastName" 
                onChange={handleInputChange} 
                value={inputs.lastName}
                placeholder={"Last Name"}
            />
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
                placeholder="Password"
            />
            <SubmitButton>Register</SubmitButton>
        </FlexForm>
        {registrationStatus.isError && <FailureNotification>Please try again</FailureNotification>}
        </>}
    </>)

    function submitForm() {
        dispatchRegistrationStatus({type: 'POST_INIT'})
        if (validateRegistration(inputs)) {
            createUser(inputs)
            .then((data) => {
                if(data.userRegistration === false) {
                    dispatchRegistrationStatus({type: 'POST_FAILURE'})
                } else {
                    dispatchRegistrationStatus({type: 'POST_SUCCESS'})
                    setRegistrationOption(false)
                }
            })
        } else {
            dispatchRegistrationStatus({type: 'POST_FAILURE'})
        }
    }
}

RegisterForm.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string
}