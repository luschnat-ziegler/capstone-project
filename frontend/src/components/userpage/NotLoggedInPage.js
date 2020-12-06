import { useState } from 'react'
import styled from 'styled-components'
import { Heading, Wrapper, ContentContainer } from '../../styles/ReusableComponents'
import LogInForm from './LogInForm'
import RegistrationForm from './RegistrationForm'
import PropTypes from 'prop-types'

export default function NotLoggedInPage({handleStatusChange, status}) {

    const [registrationOption, setRegistrationOption] = useState(false)

    return (<Wrapper>
    <Heading>You are currently not logged in</Heading>
    <ButtonContainer>
        <button onClick={() => setRegistrationOption(false)}>Log In</button>
        <button onClick={() => setRegistrationOption(true)}>Register</button>
    </ButtonContainer>
    <ContentContainer>
        {!registrationOption ? 
        <LogInForm 
            handleStatusChange={handleStatusChange} 
            status={status}
        /> : 
        <RegistrationForm 
            setRegistrationOption={setRegistrationOption}
        />}
    </ContentContainer>
    </Wrapper>)
}

const ButtonContainer = styled.div`
    width: 355px;
    margin: 10px;
    display: flex;
    justify-content: space-around;
`

NotLoggedInPage.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string
}