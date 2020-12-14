import { render } from '@testing-library/react'
import 'jest-styled-components'
import SymmetricCountryChart from './SymmetricCountryChart'

const displayedCountriesWithoutUserScore = {
  countryLeft: {
    id: 18,
    country: 'Bhutan',
    region: 'Asia',
    freedom: 59,
    gender: 49,
    lgbtq: 35,
    environment: null,
    corruption: 75,
    inequality: 65,
    total: 57,
  },
  countryRight: {
    id: 4,
    country: 'Angola',
    region: 'SSA',
    freedom: 32,
    gender: 32,
    lgbtq: 29,
    environment: 89,
    corruption: 19,
    inequality: 30,
    total: 38,
  },
}

const displayedCountriesWithUserScore = {
  countryLeft: {
    id: 18,
    country: 'Bhutan',
    region: 'Asia',
    freedom: 59,
    gender: 49,
    lgbtq: 35,
    environment: null,
    corruption: 75,
    inequality: 65,
    total: 57,
    userScore: 43,
  },
  countryRight: {
    id: 4,
    country: 'Angola',
    region: 'SSA',
    freedom: 32,
    gender: 32,
    lgbtq: 29,
    environment: 89,
    corruption: 19,
    inequality: 30,
    total: 38,
    userScore: 31,
  },
}

describe('SymmetricCountryChart', () => {
  it('renders correctly', () => {
    const { container } = render(
      <SymmetricCountryChart
        countries={displayedCountriesWithoutUserScore}
        displayOptions={{ user: false, custom: false }}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('has 7 chartsections (each 4 children) when no user is logged in', () => {
    const { container } = render(
      <SymmetricCountryChart
        countries={displayedCountriesWithoutUserScore}
        displayOptions={{ user: false, custom: false }}
      />
    )
    expect(container.children[0].children.length).toBe(28)
  })

  it('has 7 chartsections (each 4 children) when user is logged in without custom settings', () => {
    const { container } = render(
      <SymmetricCountryChart
        countries={displayedCountriesWithoutUserScore}
        displayOptions={{ user: true, custom: false }}
      />
    )
    expect(container.children[0].children.length).toBe(28)
  })

  it('has 8 chartsections (each 4 children) when user is logged in with custom settings', () => {
    const { container } = render(
      <SymmetricCountryChart
        countries={displayedCountriesWithUserScore}
        displayOptions={{ user: true, custom: true }}
      />
    )
    expect(container.children[0].children.length).toBe(32)
  })
})
