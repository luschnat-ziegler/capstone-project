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
        <ChoiceButton status={!registrationOption} onClick={() => setRegistrationOption(false)}>Log In</ChoiceButton>
        <ChoiceButton status={registrationOption} onClick={() => setRegistrationOption(true)}>Register</ChoiceButton>
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
    padding: 20px;
    justify-content: space-around;
`

const ChoiceButton = styled.button`
    border: none;
    box-shadow: 0px 0px 20px rgba(0,0,0,.2);
    width: 100px;
    height: 30px;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    color: white;
    background-color: ${props => props.status ? '#3facc4' : 'grey'};
    padding: 4px;
`

NotLoggedInPage.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string
}