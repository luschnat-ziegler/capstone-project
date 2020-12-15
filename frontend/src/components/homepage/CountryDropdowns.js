import Select from 'react-select'
import styled from 'styled-components/macro'
import PropTypes from 'prop-types'

export default function CountryDropdowns({
  countries,
  handleDisplayedCountries,
  displayedCountries,
}) {
  const dropdownOptions = countries.map((country) => ({
    value: country,
    label: country.country,
  }))

  return (
    <Wrapper>
      <Select
        styles={styles}
        options={dropdownOptions}
        onChange={handlerLeft}
        name="handlerLeft"
        placeholder={'Select Country 1'}
        defaultValue={
          displayedCountries.countryLeft.country && {
            value: displayedCountries.countryLeft,
            label: displayedCountries.countryLeft.country,
          }
        }
      />
      <Select
        styles={styles}
        options={dropdownOptions}
        onChange={handlerRight}
        name="handlerRight"
        placeholder={'Select Country 2'}
        defaultValue={
          displayedCountries.countryRight.country && {
            value: displayedCountries.countryRight,
            label: displayedCountries.countryRight.country,
          }
        }
      />
    </Wrapper>
  )

  function handlerLeft(e) {
    handleDisplayedCountries({
      ...displayedCountries,
      countryLeft: e.value,
    })
  }

  function handlerRight(e) {
    handleDisplayedCountries({
      ...displayedCountries,
      countryRight: e.value,
    })
  }
}

const Wrapper = styled.div`
  display: flex;
  padding: 10px 5px;
  justify-content: space-between;
  width: 100%;
`

const styles = {
  container: (base) => ({
    ...base,
    flex: 1,
  }),
}

CountryDropdowns.propTypes = {
  displayedCountries: PropTypes.object,
  countries: PropTypes.array,
  handleDisplayedCountries: PropTypes.func,
}
