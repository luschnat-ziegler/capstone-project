import styled from 'styled-components/macro'
import {NavLink} from 'react-router-dom'

export default function Footer () {
    return(<Wrapper>
        <NavLinkStyled exact to="/">Home</NavLinkStyled>
        <NavLinkStyled to="/user">User</NavLinkStyled>
    </Wrapper>
    )
}

const Wrapper = styled.nav`
    position: fixed;
    display: flex;
    bottom: 0;
    background-color: #0E34A0;
    height: 10vh;
    width: 100%;
    border-top: 1px solid grey;
    border-radius: 5px 5px 0 0;
    color: white;
    font-size: 2em;
    text-align: center;
`

const NavLinkStyled = styled(NavLink)`
    padding: 10px;
    color: white;
    text-decoration: none;

    &.active {
        color: grey;
    }
`