import styled from 'styled-components/macro'

const Wrapper = styled.div`
  margin: 10px;
  width: 355px;
  padding-bottom: 100px;
`

const ContentContainer = styled.div`
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  padding: 1em;
  margin-bottom: 10px;
`

const Heading = styled.h2`
  text-align: center;
  font-size: 1.3em;
  padding: 5px;
  color: #404040;
  margin-top: 1.5em;
  margin-bottom: 1.5em;
`

const SubHeading = styled.h3`
  font-size: 1.1em;
  padding-top: 10px;
  text-align: center;
  color: #404040;
`

const FlexForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  align-items: center;
  padding: 10px;
`

const FormInput = styled.input`
  margin-top: 10px;
  width: 90%;
  height: 4vh;
`

const SubmitButton = styled.button`
  border: none;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  width: 100px;
  height: 30px;
  border-radius: 5px;
  text-decoration: none;
  text-align: center;
  color: white;
  background-color: #3facc4;
  padding: 4px;
  margin-top: 20px;
`

const FailureNotification = styled.p`
  text-align: center;
  color: orange;
  margin-top: 10px;
`

const LoaderContainer = styled.div`
  padding-top: 30vh;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
`

export {
  Wrapper,
  ContentContainer,
  Heading,
  SubHeading,
  FlexForm,
  FormInput,
  SubmitButton,
  FailureNotification,
  LoaderContainer,
}
