import getCountriesAndUser from './getCountriesAndUser'

describe('getCountriesAndUser', () => {
  it('returns an array of promise data and calls fetch twice', async () => {
    const fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('testdata'),
      })
    )
    const result = await getCountriesAndUser(fetch)
    expect(result).toEqual(['testdata', 'testdata'])
    expect(fetch).toHaveBeenCalledTimes(2)
  })
})
