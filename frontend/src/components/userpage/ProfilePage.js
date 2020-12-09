import Slider from 'rc-slider' 
import 'rc-slider/assets/index.css'
import { useState } from 'react'
import { 
    Wrapper, 
    ContentContainer, 
    Heading, 
    SubHeading 
} from '../../styles/ReusableComponents'
import PropTypes from 'prop-types'

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
            <Heading>Profile Page</Heading>
            <ContentContainer>
                <SubHeading>You are logged in as:</SubHeading>
                <p>Name: {userData.firstName} {userData.lastName}</p>
                <p>E-Mail: {userData.email}</p>
            </ContentContainer>
            <ContentContainer>
                <SubHeading>Your settings:</SubHeading>
                <p>Environment and Climate</p>
                <Slider 
                    min={0} 
                    max={4} 
                    defaultValue={userData.weightEnvironment === null ? 2 : userData.weightEnvironment}
                    onChange={(event) => onSliderChange(event, "weightEnvironment")}
                />
                <p>Gender Equality</p>
                <Slider 
                    min={0} 
                    max={4} 
                    defaultValue={userData.weightGender === null ? 2 : userData.weightGender}
                    onChange={(event) => onSliderChange(event, "weightGender")}
                    />
                <p>LGBTQ-Acceptance</p>
                <Slider 
                    min={0} 
                    max={4} 
                    defaultValue={userData.weightLgbtq === null ? 2 : userData.weightLgbtq}
                    onChange={(event) => onSliderChange(event, "weightLgbtq")}
                    />
                <p>Freedom and Democracy</p>
                <Slider 
                    min={0} 
                    max={4} 
                    defaultValue={userData.weightFreedom === null ? 2 : userData.weightFreedom}
                    onChange={(event) => onSliderChange(event, "weightFreedom")}    
                />
                <p>Corruption Control</p>
                <Slider 
                    min={0} 
                    max={4} 
                    defaultValue={userData.weightCorruption === null ? 2 : userData.weightCorruption}
                    onChange={(event) => onSliderChange(event, "weightCorruption")}
                    />
                <p>Income Equality</p>
                <Slider 
                    min={0} 
                    max={4} 
                    defaultValue={userData.weightEquality === null ? 2 : userData.weightEquality}
                    onChange={(event) => onSliderChange(event, "weightEquality")}
                    />
                <button onClick={submitPrefs}>Submit!</button>
            </ContentContainer>
            <button onClick={logOut}>Log me out!</button>
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

ProfilePage.propTypes = {
    handleStatusChange: PropTypes.func,
    status: PropTypes.string,
    userData: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object
    ])
}