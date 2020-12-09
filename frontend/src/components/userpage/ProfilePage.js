import Slider from 'rc-slider' 
import 'rc-slider/assets/index.css'
import { useState } from 'react'
import { 
    Wrapper, 
    ContentContainer, 
    Heading, 
    SubHeading,
    SubmitButton
} from '../../styles/ReusableComponents'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

import { deleteToken } from '../../services/tokenStorage'
import updateUser from '../../services/userUpdate'

export default function ProfilePage({userData, handleStatusChange, status}) {

    const [sliderValues, setSliderValues] = useState({
        weightGender: userData.weightGender === null ? 2 : userData.weightGender,
        weightEnvironment: userData.weightEnvironment === null ? 2 : userData.weightEnvironment,
        weightLgbtq: userData.weightLgbtq === null ? 2 : userData.weightLgbtq,
        weightCorruption: userData.weightCorruption === null ? 2 : userData.weightCorruption,
        weightEquality: userData.weightEquality === null ? 2 : userData.weightEquality,
        weightFreedom: userData.weightFreedom === null ? 2 : userData.weightFreedom
    })

    return  (
        <Wrapper>
            <HorizontalFlexContainer>
                <Heading>Your Profile</Heading>
                <LogOutButton onClick={logOut}>Log me out!</LogOutButton>
            </HorizontalFlexContainer>
            <ContentContainer>
                <HorizontalFlexContainer>
                    <p>{userData.firstName} {userData.lastName}</p>
                    <p>{userData.email}</p>
                </HorizontalFlexContainer>
            </ContentContainer>
            <ContentContainer>
                <SliderFlexContainer>
                    <SubHeading>Slide to adjust your priority settings:</SubHeading>
                    <BarLegend>Environment and Climate</BarLegend>
                    <Slider 
                        min={0} 
                        max={4} 
                        defaultValue={userData.weightEnvironment === null ? 2 : userData.weightEnvironment}
                        onChange={(event) => onSliderChange(event, "weightEnvironment")}
                    />
                    <BarLegend>Gender Equality</BarLegend>
                    <Slider 
                        min={0} 
                        max={4} 
                        defaultValue={userData.weightGender === null ? 2 : userData.weightGender}
                        onChange={(event) => onSliderChange(event, "weightGender")}
                        />
                    <BarLegend>LGBTQ-Acceptance</BarLegend>
                    <Slider 
                        min={0} 
                        max={4} 
                        defaultValue={userData.weightLgbtq === null ? 2 : userData.weightLgbtq}
                        onChange={(event) => onSliderChange(event, "weightLgbtq")}
                        />
                    <BarLegend>Freedom and Democracy</BarLegend>
                    <Slider 
                        min={0} 
                        max={4} 
                        defaultValue={userData.weightFreedom === null ? 2 : userData.weightFreedom}
                        onChange={(event) => onSliderChange(event, "weightFreedom")}    
                    />
                    <BarLegend>Corruption Control</BarLegend>
                    <Slider 
                        min={0} 
                        max={4} 
                        defaultValue={userData.weightCorruption === null ? 2 : userData.weightCorruption}
                        onChange={(event) => onSliderChange(event, "weightCorruption")}
                        />
                    <BarLegend>Income Equality</BarLegend>
                    <Slider 
                        min={0} 
                        max={4} 
                        defaultValue={userData.weightEquality === null ? 2 : userData.weightEquality}
                        onChange={(event) => onSliderChange(event, "weightEquality")}
                        />
                    <SubmitButton onClick={submitPrefs}>Submit!</SubmitButton>
                </SliderFlexContainer>
            </ContentContainer>
        </Wrapper>
    )

    function onSliderChange (value, entry) {
        setSliderValues({
            ...sliderValues,
            [entry]: value
        })
    }

    function submitPrefs () {
        updateUser(sliderValues)
        .then(data => {
            if (data.loggedIn === false) {
                handleStatusChange(status === "toggle" ? "untoggle" : "toggle")
            } else {
                alert("Update complete")
                handleStatusChange(status === "toggle" ? "untoggle" : "toggle")
            }
        })
        .catch(error => console.log(error))
    }

    function logOut() {
        deleteToken()
        handleStatusChange(status === "toggle" ? "untoggle" : "toggle")
    }
}

const HorizontalFlexContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
`

const SliderFlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const BarLegend = styled.p`
    color: #606060;
    padding-top: 15px;
    padding-bottom: 5px;
`

const LogOutButton = styled.button`
    border: none;
    box-shadow: 0px 0px 20px rgba(0,0,0,.2);
    width: 100px;
    height: 30px;
    border-radius: 5px;
    text-decoration: none;
    text-align: center;
    color: white;
    background-color: grey;
    padding: 4px;
`

ProfilePage.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string,
    userData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
}