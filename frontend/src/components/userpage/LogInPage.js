import {useState} from 'react'
import {validateEmail} from '../../services/validations'
import {saveToken} from '../../services/tokenStorage'
import {Redirect} from 'react-router-dom'

export default function LoginPage () {

    const [logInData, setLogInData] = useState ({
        email: '',
        password: ''
    })

    const [failure, setFailure] = useState()

    return <form onSubmit={submitForm}>
        {failure && <p>Please try again</p>}
        {failure === false && <Redirect to="/user"/>}
        <div>
            <label htmlFor="email"><strong>E-mail</strong></label>
            <input type="text" name="email" onChange={handleChange} value={logInData.email}></input>
        </div>
        <div>
            <label htmlFor="password"><strong>Password</strong></label>
            <input type="text" name="password" onChange={handleChange} value={logInData.password}></input>
        </div>
        <button>Log In</button>
    </form>

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
               }
           })
        } else {
            setFailure(true)
        }
    }
}