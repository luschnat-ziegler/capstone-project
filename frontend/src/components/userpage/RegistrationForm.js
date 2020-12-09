import { useState } from 'react'
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

    const [registrationData, setRegistrationData] = useState ({
        email: '',
        password: '',
        lastName: '',
        firstName: ''
    })

    const [isFailure, setIsFailure] = useState(false)
    const [isPosting, setIsPosting] = useState(false)

    return (<>
        {isPosting ? <p>Loading. Please wait...</p> : <>
        <FlexForm onSubmit={submitForm}>
            <FormInput 
                type="text" 
                name="firstName" 
                onChange={handleChange} 
                value={registrationData.firstName}
                placeholder={"First Name"}
            />
            <FormInput 
                type="text" 
                name="lastName" 
                onChange={handleChange} 
                value={registrationData.lastName}
                placeholder={"Last Name"}
            />
            <FormInput 
                type="text" 
                name="email" 
                onChange={handleChange} 
                value={registrationData.email}
                placeholder={"E-Mail"}
            />
            <FormInput 
                type="password" 
                name="password" 
                onChange={handleChange} 
                value={registrationData.password}
                placeholder="Password"
            />
            <SubmitButton>Register</SubmitButton>
        </FlexForm>
        {isFailure && <FailureNotification>Please try again</FailureNotification>}
        </>}
    </>)

    function handleChange(event) {
        const fieldValue = event.target.value
        setRegistrationData({
            ...registrationData,
            [event.target.name]: fieldValue
        })
    }

    function submitForm(event) {
        setIsPosting(true)
        event.preventDefault()
        if (validateRegistration(registrationData)) {
            createUser(registrationData)
            .then((data) => {
                if(data.userRegistration === false) {
                    setIsFailure(true)
                    setIsPosting(false)
                } else {
                    setIsFailure(false)
                    setIsPosting(false)
                    setRegistrationOption(false)
                }
            })
        } else {
            setIsFailure(true)
            setIsPosting(false)
        }
    }
}

RegisterForm.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string
}