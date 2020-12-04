import styled from 'styled-components/macro'
import PropTypes from 'prop-types'
import ChartSection from './Chartsection'

// Main export

export default function SymmetricCountryChart ({countries}) {

    return(<Wrapper>
        <ChartSection displayedCountries={countries} entry={'total'} heading={'Total Score'}/>
        <ChartSection displayedCountries={countries} entry={'freedom'} heading={'Democracy and Freedom'}/>
        <ChartSection displayedCountries={countries} entry={'environment'} heading={'Environment and Climate'}/>
        <ChartSection displayedCountries={countries} entry={'gender'} heading={'Gender Equality'}/>
        <ChartSection displayedCountries={countries} entry={'lgbtq'} heading={'LGBTQ Acceptance'}/>
        <ChartSection displayedCountries={countries} entry={'inequality'} heading={'Income Equality'}/>
        <ChartSection displayedCountries={countries} entry={'corruption'} heading={'Corruption Control'}/>
    </Wrapper>)
}

// Styled Components

const Wrapper = styled.section`
    padding-top: 20px;
    text-align: center;
    width: 375px;
    display: grid;
    grid-template-columns: 10fr 1fr 10fr;
`

// Proptypes

SymmetricCountryChart.propTypes = {
    countries: PropTypes.object
}