import { render } from '@testing-library/react'
import 'jest-styled-components'
import Chartsection from './Chartsection'

const displayedCountries = {
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

describe('Chartsection', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Chartsection
        displayedCountries={displayedCountries}
        heading={'Corruption Control'}
        entry={'corruption'}
      />
    )
    expect(container).toMatchSnapshot()
  })

  it('has the correct heading', () => {
    const { getByRole } = render(
      <Chartsection
        displayedCountries={displayedCountries}
        heading={'Corruption Control'}
        entry={'corruption'}
      />
    )

    const heading = getByRole('heading')
    expect(heading).toHaveTextContent(/corruption/i)
  })

  it('has a divider div', () => {
    const { container } = render(
      <Chartsection
        displayedCountries={displayedCountries}
        heading={'Corruption Control'}
        entry={'corruption'}
      />
    )

    const divider = container.children[2]
    expect(divider).toBeInTheDocument()
    expect(divider).toHaveStyleRule('background-color', '#e8eddf')
    expect(divider).toHaveStyleRule('grid-column', '2 / span 1')
  })

  it('has two bars of correct length', () => {
    const { container } = render(
      <Chartsection
        displayedCountries={displayedCountries}
        heading={'Corruption Control'}
        entry={'corruption'}
      />
    )

    const leftBar = container.children[1]
    const rightBar = container.children[3]
    expect(leftBar).toBeInTheDocument()
    expect(rightBar).toBeInTheDocument()
    expect(leftBar).toHaveStyleRule('width', '67.5%')
    expect(rightBar).toHaveStyleRule('width', '17.1%')
  })
})
