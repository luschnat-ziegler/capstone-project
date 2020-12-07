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

    const [failure, setFailure] = useState()

    return (<>
        <SubHeading>Log in</SubHeading>
        <GridForm onSubmit={submitForm}>
                <label htmlFor="email"><strong>E-mail</strong></label>
                <input type="text" name="email" onChange={handleChange} value={logInData.email}></input>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="text" name="password" onChange={handleChange} value={logInData.password}></input>
                <SubmitButton>Log In</SubmitButton>
            </GridForm>
            {failure && <FailureNotification>Please try again</FailureNotification>}
    </>)

    function handleChange(event) {
        const fieldValue = event.target.value
        setLogInData({
            ...logInData,
            [event.target.name]: fieldValue
        })
    }

    function submitForm(event) {
        event.preventDefault()
        if(validateEmail(logInData.email)) {
        logInUser(logInData)
        .then(data => {
            if (data.success === false) {
                setFailure(true)
            } else {
                saveToken(data.value)
                setFailure(false)
                handleStatusChange(status === "toggle" ? "untoggle" : "toggle")
            }
        })
        } else {
            setFailure(true)
        }
    }
}

LogInForm.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string
}