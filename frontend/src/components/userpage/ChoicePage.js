import {Link, useRouteMatch, Redirect} from 'react-router-dom'
import {Heading} from '../ReusableComponents'
import styled from 'styled-components/macro'

export default function ChoicePage() {
    return <>
        <Redirect to="/user/login"/>
        <Heading>You are currently not logged in</Heading>
        <ButtonContainer>
            <LinkButton to={`${useRouteMatch().url}/login`}>Log In</LinkButton>
            <LinkButton to={`${useRouteMatch().url}/register`}>Register</LinkButton>
        </ButtonContainer>
    </>
}

const ButtonContainer = styled.div`
    width: 355px;
    margin: 10px;
    display: flex;
    justify-content: space-around;
`

const LinkButton = styled(Link)`
    width: 100px;
    height: 30px;
    border: 1px solid grey;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    color: black;
    background-color: lightgreen;
    padding: 4px;

`