import styled from 'styled-components/macro'

export const Wrapper = styled.div`
    margin: 10px;
    width: 355px;
`

export const ContentContainer = styled.div`
    border: 1px solid black;
    border-radius: 5px;
    padding: 1em;
    margin-bottom: 10px;
`

export const Heading = styled.h2`
    text-align: center;
    font-size: 1.3em;
    padding: 5px;
` 

export const SubHeading = styled.h3`
    font-size: 1.1em;
    padding-top: 5px;
    padding-bottom: 5px;
`

export const GridForm = styled.form`
    display: grid;
    gap: 5px;
    grid-template-columns: 1fr 2fr;
    margin-top: 20px;
`

export const SubmitButton = styled.button`
    width: 100px;
    height: 30px;
    border: 1px solid grey;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    color: black;
    background-color: orange;
    padding: 4px;
    grid-column: 1 / span 2;
    justify-self: center;
    margin-top: 20px;
`

export const FailureNotification = styled.p`
    text-align: center;
    color: red;
    margin-top: 10px;
`