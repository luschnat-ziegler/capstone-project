import Select from 'react-select'
import styled from 'styled-components/macro'

export default function CountryDropdowns ({countries, handleDisplayedCountries, displayedCountries}) {


    const dropdownOptions = countries.map(country => ({
            value: country, 
            label: country.country
        }))
    
    return (
        <Wrapper>
        <Select styles={styles}
            options = {dropdownOptions}
            onChange = {handlerLeft}
        />
        <Select styles={styles}
            options = {dropdownOptions}
            onChange = {handlerRight}
        />
        </Wrapper>
    )

    // ToDo: Refactor into one function
    function handlerLeft (e) {
        handleDisplayedCountries({
            countryLeft: e.value,
            countryRight: displayedCountries.countryRight
        })
    }

    function handlerRight (e) {
        handleDisplayedCountries({
            countryLeft: displayedCountries.countryLeft,
            countryRight: e.value
        })
    }
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
`

const styles = {
    container: base => ({
      ...base,
      flex: 1
    })
  };