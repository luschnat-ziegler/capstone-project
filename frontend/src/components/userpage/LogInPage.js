import {useState} from 'react'
import {validateEmail} from '../../services/validations'
import {saveToken} from '../../services/tokenStorage'
import {Redirect} from 'react-router-dom'
import {ContentContainer, Wrapper, SubHeading, GridForm, SubmitButton, FailureNotification} from '../ReusableComponents'


export default function LoginPage ({handleStatusChange, status}) {

    const [logInData, setLogInData] = useState ({
        email: '',
        password: ''
    })

    const [failure, setFailure] = useState()

    return <Wrapper>
        {failure === false && <Redirect to="/user"/>}
        <ContentContainer>
            <SubHeading>Log in</SubHeading>
            <GridForm onSubmit={submitForm}>
                <label htmlFor="email"><strong>E-mail</strong></label>
                <input type="text" name="email" onChange={handleChange} value={logInData.email}></input>
                <label htmlFor="password"><strong>Password</strong></label>
                <input type="text" name="password" onChange={handleChange} value={logInData.password}></input>
                <SubmitButton>Log In</SubmitButton>
            </GridForm>
            {failure && <FailureNotification>Please try again</FailureNotification>}
        </ContentContainer>
    </Wrapper>

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
           fetch('http://countrycheck.local/login', {
               method: 'post',
               body: JSON.stringify(logInData)
           }).then(response => response.json()
           ).then(data => {
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