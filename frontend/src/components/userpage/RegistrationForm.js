import { useState } from 'react'
import { SubHeading, GridForm, SubmitButton, FailureNotification } from '../../styles/ReusableComponents'
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
        <SubHeading>Register new account:</SubHeading>
        <GridForm onSubmit={submitForm}>
            <label htmlFor="firstName"><strong>First Name</strong></label>
            <input type="text" name="firstName" onChange={handleChange} value={registrationData.firstName}></input>
            <label htmlFor="lastName"><strong>Last Name</strong></label>
            <input type="text" name="lastName" onChange={handleChange} value={registrationData.lastName}></input>
            <label htmlFor="email"><strong>E-Mail</strong></label>
            <input type="text" name="email" onChange={handleChange} value={registrationData.email}></input>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="text" name="password" onChange={handleChange} value={registrationData.password}></input>
            <SubmitButton>Submit</SubmitButton>
        </GridForm>
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