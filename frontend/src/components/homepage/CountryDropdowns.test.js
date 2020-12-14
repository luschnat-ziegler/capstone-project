import { render } from '@testing-library/react'
import 'jest-styled-components'
import CountryDropdowns from './CountryDropdowns'
import selectEvent from 'react-select-event'

const displayedCountriesEmpty = {
  countryLeft: {},
  countryRight: {},
}

const displayedCountriesSelected = {
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

const countries = [
  {
    corruption: 6,
    country: 'Afghanistan',
    environment: null,
    freedom: 27,
    gender: 32,
    id: 1,
    inequality: null,
    lgbtq: 16,
    region: 'Asia',
    total: 20,
  },
  {
    corruption: 31,
    country: 'Albania',
    environment: 58,
    freedom: 67,
    gender: 75,
    id: 2,
    inequality: 76,
    lgbtq: 27,
    region: 'Europe',
    total: 56,
  },
]

describe('CountryDropdowns', () => {
  it('renders correctly', () => {
    const handleDisplayedCountries = jest.fn()
    const { container } = render(
      <CountryDropdowns
        countries={countries}
        displayedCountries={displayedCountriesEmpty}
        handleDisplayedCountries={handleDisplayedCountries}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('features two dropdown menus', () => {
    const handleDisplayedCountries = jest.fn()
    const { getByText } = render(
      <CountryDropdowns
        countries={countries}
        displayedCountries={displayedCountriesEmpty}
        handleDisplayedCountries={handleDisplayedCountries}
      />
    )
    const dropdownLeft = getByText(/select country 1/i)
    const dropdownRight = getByText(/select country 2/i)

    expect(dropdownLeft).toBeInTheDocument()
    expect(dropdownRight).toBeInTheDocument()
  })
})
