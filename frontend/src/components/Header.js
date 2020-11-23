import styled from 'styled-components/macro'

export default function Header() {
    return (
        <StyledHeader>
        <h1>Country comparison</h1>
        <h4>Know where you go!</h4>
        </StyledHeader>
    )
}

const StyledHeader = styled.div`
    background-color: orange;
    color: black;
    padding: 10px;
`