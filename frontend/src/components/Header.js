import styled from 'styled-components/macro'

// Main export

export default function Header() {
    return (
        <StyledHeader>
        <MainHeading>Country Checker</MainHeading>
        <SubTitle>Know where you go!</SubTitle>
        </StyledHeader>
    )
}

//Styled Components

const StyledHeader = styled.header`
    height: 10vh;
    background-color: #0E34A0;
    color: #F8F8F8;
    padding: 10px;
    border-bottom: 1px solid grey;
    border-radius: 0 0 5px 5px;
`

const MainHeading = styled.h1`
    font-size: 1.5em;
    padding-bottom: 5px;
`

const SubTitle = styled.h3`
    font-size: 1em;
    color: white;
`