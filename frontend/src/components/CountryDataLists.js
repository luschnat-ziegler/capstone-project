import styled from 'styled-components/macro'

export default function CountryDataLists({displayedCountries}) {
    
    return(
        <Wrapper>
            {displayedCountries.countryLeft.hasOwnProperty('country') && 
                <CountryDataList country={displayedCountries.countryLeft}/>}
            {displayedCountries.countryRight.hasOwnProperty('country') && 
                <CountryDataList country={displayedCountries.countryRight}/>}
        </Wrapper>
    )
}

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
`

function CountryDataList({country}) {
    return (<div>
        <ul>
            <li>Total: {country.total}</li>
            <li>Freedom: {country.freedom}</li>
            <li>Environment: {country.environment}</li>
            <li>LGBTQ: {country.lgbtq}</li>
            <li>Corruption: {country.corruption} </li>
            <li>Gender: {country.gender} </li>
            <li>Equality: {country.inequality} </li>
        </ul>
    </div>)
}