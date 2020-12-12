import styled from 'styled-components/macro'
import { BarChartIconLeft, BarChartIconRight } from '../styles/svgIcons'

export default function Header() {
  return (
    <StyledHeader>
      <BarChartIconLeft />
      <MainHeading>CountryChecker</MainHeading>
      <BarChartIconRight />
    </StyledHeader>
  )
}

const StyledHeader = styled.header`
  height: 10vh;
  background-image: linear-gradient(45deg, #e0e0e0, #f5f5f5);
  color: #00008b;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  text-align: center;
  padding: 12px;
  border-radius: 0 0 5px 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MainHeading = styled.h1`
  font-size: 2em;
  padding-bottom: 5px;
  opacity: 0.8;
  font-weight: bold;
`
