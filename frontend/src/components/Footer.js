import styled from 'styled-components/macro'
import {NavLink} from 'react-router-dom'
import { UserIcon, HomeIcon } from '../styles/svgIcons'

export default function Footer () {
    return(<Wrapper>
        {/*
        <NavLinkStyled exact to="/">Home</NavLinkStyled>
        <NavLinkStyled to="/user">User</NavLinkStyled>
        */}
        <NavLinkIcon exact to="/"><HomeIcon/></NavLinkIcon>
        <NavLinkIcon to="/user"><UserIcon/></NavLinkIcon>        
    </Wrapper>
    )
}

const Wrapper = styled.nav`
    position: fixed;
    display: flex;
    justify-content: space-around;
    bottom: 0;
    background-image: linear-gradient(45deg, #E0E0E0, #F5F5F5);
    height: 10vh;
    width: 100%;
    box-shadow: 0px 0px 20px rgba(0,0,0,.2);
    border-radius: 10px;
    color: white;
    font-size: 2em;
    text-align: center;
`

const NavLinkIcon = styled(NavLink)`
    padding: 20px;
    color: #47477a;
    opacity: .6;

    &.active {
        color: #00008B;
        opacity: 1;
    }
`
