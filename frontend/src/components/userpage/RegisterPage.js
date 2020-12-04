import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {validateRegistration} from '../../services/validations'
import {ContentContainer, Wrapper, SubHeading, GridForm, SubmitButton,FailureNotification} from '../ReusableComponents'

export default function RegisterPage () {

    const [registrationData, setRegistrationData] = useState ({
        email: '',
        password: '',
        lastName: '',
        firstName: ''
    })

    const [failure, setFailure] = useState()

    return <Wrapper>
        {failure === false && <Redirect to="/user/login"/>}
            <ContentContainer>
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
            {failure && <FailureNotification>Please try again</FailureNotification>}
        </ContentContainer>
    </Wrapper>

    function handleChange(event) {
        const fieldValue = event.target.value
        setRegistrationData({
            ...registrationData,
            [event.target.name]: fieldValue
        })
    }

    function submitForm(event) {
        event.preventDefault()
        if (validateRegistration(registrationData)) {
            fetch('http://countrycheck.local/user', {
                method: 'post',
                body: JSON.stringify(registrationData)
            }).then(response => response.json()
            ).then((data) => {
                if(data.userRegistration === false) {
                    setFailure(true)
                } else (
                    setFailure(false)
                )
            })
        } else {
            setFailure(true)
        }
    }
}

