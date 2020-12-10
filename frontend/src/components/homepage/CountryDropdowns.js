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
      <Select styles={styles} options={dropdownOptions} onChange={handlerLeft} />
      <Select styles={styles} options={dropdownOptions} onChange={handlerRight} />
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
