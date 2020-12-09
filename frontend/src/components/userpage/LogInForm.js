import {useState} from 'react'
import {
    SubHeading, 
    GridForm, 
    SubmitButton,
    FailureNotification
} from '../../styles/ReusableComponents'
import {validateEmail} from '../../services/validations'
import logInUser from '../../services/logInUser'
import {saveToken} from '../../services/tokenStorage'
import PropTypes from 'prop-types'

export default function LogInForm({handleStatusChange, status}) {

    const [logInData, setLogInData] = useState ({
        email: '',
        password: ''
    })

    const [isFailure, setIsFailure] = useState(false)
    const [isPosting, setIsPosting] = useState(false)

    return (
        <>
        {isPosting ? <p>Loading. Please wait...</p> : <>
        <SubHeading>Log in</SubHeading>
        <GridForm onSubmit={submitForm}>
                <label htmlFor="email"><strong>E-mail</strong></label>
                <input type="text" name="email" onChange={handleChange} value={logInData.email}></input>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="text" name="password" onChange={handleChange} value={logInData.password}></input>
                <SubmitButton>Log In</SubmitButton>
            </GridForm>
            {isFailure && <FailureNotification>Please try again</FailureNotification>}</>}
        </>)

    function handleChange(event) {
        const fieldValue = event.target.value
        setLogInData({
            ...logInData,
            [event.target.name]: fieldValue
        })
    }

    function submitForm(event) {
        setIsPosting(true)
        event.preventDefault()
        if(validateEmail(logInData.email)) {
        logInUser(logInData)
        .then(data => {
            if (data.success === false) {
                setIsFailure(true)
                setIsPosting(false)
            } else {
                saveToken(data.value)
                setIsFailure(false)
                setIsPosting(false)
                handleStatusChange(status === "toggle" ? "untoggle" : "toggle")
            }
        })
        } else {
            setIsPosting(false)
            setIsFailure(true)
        }
    }
}

LogInForm.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string
}