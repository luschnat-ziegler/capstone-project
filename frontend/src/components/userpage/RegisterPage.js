import {useState} from 'react'
import {Redirect} from 'react-router-dom'
import {validateRegistration} from '../../services/validations'

export default function RegisterPage () {

    const [registrationData, setRegistrationData] = useState ({
        email: '',
        password: '',
        lastName: '',
        firstName: ''
    })

    const [failure, setFailure] = useState()

    return <form onSubmit={submitForm}>
        {failure && <p>Please try again</p>}
        {failure === false && <Redirect to="/user/login"/>}
        <div>
            <label htmlFor="firstName"><strong>First Name</strong></label>
            <input type="text" name="firstName" onChange={handleChange} value={registrationData.firstName}></input>
        </div>
        <div>
            <label htmlFor="lastName"><strong>Last Name</strong></label>
            <input type="text" name="lastName" onChange={handleChange} value={registrationData.lastName}></input>
        </div>
        <div>
            <label htmlFor="email"><strong>E-Mail</strong></label>
            <input type="text" name="email" onChange={handleChange} value={registrationData.email}></input>
        </div>
        <div>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="text" name="password" onChange={handleChange} value={registrationData.password}></input>
        </div>
        <button>Register</button>
    </form>

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