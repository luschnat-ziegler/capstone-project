import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import ChartSection from './Chartsection'

export default function SymmetricCountryChart({ countries, displayOptions }) {
  return (
    <Wrapper>
      {displayOptions.custom && (
        <ChartSection displayedCountries={countries} entry={'userScore'} heading={'Your Score'} />
      )}
      <ChartSection displayedCountries={countries} entry={'total'} heading={'Total Score'} />
      <ChartSection
        displayedCountries={countries}
        entry={'freedom'}
        heading={'Democracy and Freedom'}
      />
      <ChartSection
        displayedCountries={countries}
        entry={'environment'}
        heading={'Environment and Climate'}
      />
      <ChartSection displayedCountries={countries} entry={'gender'} heading={'Gender Equality'} />
      <ChartSection displayedCountries={countries} entry={'lgbtq'} heading={'LGBTQ Acceptance'} />
      <ChartSection
        displayedCountries={countries}
        entry={'inequality'}
        heading={'Income Equality'}
      />
      <ChartSection
        displayedCountries={countries}
        entry={'corruption'}
        heading={'Corruption Control'}
      />
    </Wrapper>
  )
}

const Wrapper = styled.section`
  margin-bottom: 100px;
  padding-top: 20px;
  text-align: center;
  width: 100%;
  padding-left: 10px;
  padding-right: 10px;
  display: grid;
  max-width: 800px;
  grid-template-columns: 10fr 1fr 10fr;
`

SymmetricCountryChart.propTypes = {
  countries: PropTypes.object,
  displayOptions: PropTypes.object,
}
