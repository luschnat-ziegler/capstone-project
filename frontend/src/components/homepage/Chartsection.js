import styled from 'styled-components/macro'
import { scaleSequential } from 'd3-scale'
import { interpolateRdYlGn } from 'd3-scale-chromatic'
import PropTypes from 'prop-types'

export default function Chartsection({ displayedCountries, entry, heading }) {
  return (
    <>
      <CategoryHeading>{heading}</CategoryHeading>
      {displayedCountries.countryLeft.hasOwnProperty('country') &&
        (displayedCountries.countryLeft[entry] ? (
          <Bar data={displayedCountries.countryLeft[entry]} left={true} />
        ) : (
          <NoDataBar left={true}>No data</NoDataBar>
        ))}
      <Divider />
      {displayedCountries.countryRight.hasOwnProperty('country') &&
        (displayedCountries.countryRight[entry] ? (
          <Bar data={displayedCountries.countryRight[entry]} left={false} />
        ) : (
          <NoDataBar left={false}>No data</NoDataBar>
        ))}
    </>
  )
}

const colorScale = scaleSequential().domain([0, 100]).interpolator(interpolateRdYlGn)

const CategoryHeading = styled.h3`
  grid-column: 1 / span 3;
  padding: 10px;
  color: #404040;
`

const Divider = styled.div`
  background-color: #e8eddf;
  border: 1px solid grey;
  grid-column: 2 / span 1;
  height: 30px;
  width: 100%;
`

const Bar = styled.div`
  border: 1px solid grey;
  border-right: ${(props) => props.left && 'none'};
  border-left: ${(props) => !props.left && 'none'};
  border-radius: ${(props) => (props.left ? '5px 0 0 5px' : '0 5px 5px 0')};
  background-color: ${(props) => colorScale(props.data)};
  height: 30px;
  width: ${(props) => String(props.data * 0.9) + '%'};
  justify-self: ${(props) => props.left && 'end'};
`

const NoDataBar = styled.div`
  padding: 5px;
  background-color: whitesmoke;
  color: grey;
  border: 1px solid grey;
  border-style: dotted;
  border-right: ${(props) => props.left && 'none'};
  border-left: ${(props) => !props.left && 'none'};
  border-radius: ${(props) => (props.left ? '5px 0 0 5px' : '0 5px 5px 0')};
  height: 30px;
  width: 50%;
  justify-self: ${(props) => props.left && 'end'};
`

Chartsection.propTypes = {
  displayedCountries: PropTypes.object,
  entry: PropTypes.string,
  heading: PropTypes.string,
}

Bar.propTypes = {
  data: PropTypes.number,
  left: PropTypes.bool,
}

NoDataBar.propTypes = {
  left: PropTypes.bool,
}
