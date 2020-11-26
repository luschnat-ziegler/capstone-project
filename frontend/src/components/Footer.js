import styled from 'styled-components/macro'

export default function Footer () {
    return(<Wrapper>
        Placeholder for NavBar
    </Wrapper>
    )
}

const Wrapper = styled.footer`
    position: fixed;
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