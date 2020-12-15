import getUser from './getUser'

describe('getUser', () => {
  it('returns a user object and calls fetch once', async () => {
    const fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('testdata'),
      })
    )

    const result = await getUser(fetch)
    expect(result).toEqual('testdata')
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
