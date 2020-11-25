import styled from 'styled-components/macro'

export default function SymmetricCountryChart ({Countries}) {

    return(<Wrapper>
        <CategoryHeading>Total Score</CategoryHeading>
        <BarAreaLeft displayedCountries={Countries} entry={'total'}/>
        <Divider/>
        <BarAreaRight displayedCountries={Countries} entry={'total'}/>
        <CategoryHeading>Democracy and Freedom</CategoryHeading>
        <BarAreaLeft displayedCountries={Countries} entry={'freedom'}/>
        <Divider/>
        <BarAreaRight displayedCountries={Countries} entry={'freedom'}/>
        <CategoryHeading>Environment and Climate</CategoryHeading>
        <BarAreaLeft displayedCountries={Countries} entry={'environment'}/>
        <Divider/>
        <BarAreaRight displayedCountries={Countries} entry={'environment'}/>
        <CategoryHeading>Gender Equality</CategoryHeading>
        <BarAreaLeft displayedCountries={Countries} entry={'gender'}/>
        <Divider/>
        <BarAreaRight displayedCountries={Countries} entry={'gender'}/>
        <CategoryHeading>LGBTQ Acceptance</CategoryHeading>
        <BarAreaLeft displayedCountries={Countries} entry={'lgbtq'}/>
        <Divider/>
        <BarAreaRight displayedCountries={Countries} entry={'lgbtq'}/>
        <CategoryHeading>Income Equality</CategoryHeading>
        <BarAreaLeft displayedCountries={Countries} entry={'inequality'}/>
        <Divider/>
        <BarAreaRight displayedCountries={Countries} entry={'inequality'}/>
        <CategoryHeading>Corruption Control</CategoryHeading>
        <BarAreaLeft displayedCountries={Countries} entry={'corruption'}/>
        <Divider/>
        <BarAreaRight displayedCountries={Countries} entry={'corruption'}/>
    </Wrapper>)

}

function BarAreaLeft ({displayedCountries, entry}) {
    if (displayedCountries.countryLeft.hasOwnProperty('country')) {
        return <LeftBar dataValue={displayedCountries.countryLeft[entry]}/>
    } else {
        return <></>
    }
}

function BarAreaRight ({displayedCountries, entry}) {
    if (displayedCountries.countryRight.hasOwnProperty('country')) {
        return <RightBar dataValue={displayedCountries.countryRight[entry]}/>
    } else {
        return <></>
    }
}

function LeftBar({dataValue}) {
    if (dataValue) {
        const valueStr = String(dataValue)+"%"
        return(<BarContainer>
            <div style={{width: valueStr, height: '100%',position: 'absolute', right: '0', backgroundColor: 'red'}}></div>
        </BarContainer>)
    } else {
        return <p>No data</p>
    }
}

function RightBar({dataValue}) {
    if (dataValue) {
        const valueStr = String(dataValue)+"%"
        return(<BarContainer>
            <div style={{width: valueStr, height: '100%',position: 'absolute', left: '0', backgroundColor: 'red'}}></div>
        </BarContainer>)
    } else {
        return <p>No data</p>
    }
}

const Wrapper = styled.div`
    width: 375px;
    display: grid;
    grid-template-columns: 10fr 1fr 10fr;
`
const Divider = styled.div`
    background-color: grey;
    grid-column: 2 / span 1;
    height: 20px;
    width: 100%;    
`

const CategoryHeading = styled.h3`
    grid-column: 1 / span 3;
    padding: 5px;
`

const BarContainer = styled.div`
    width: 100%;
    position: relative;
`
