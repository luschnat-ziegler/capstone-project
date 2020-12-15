import logInUser from './logInUser'

describe('logInUser', () => {
  it('calls fetch once with supplied data', async () => {
    const fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('testdata'),
      })
    )

    await logInUser('testdata', fetch)
    expect(fetch).toHaveBeenCalledWith('http://countrycheck.local/login', {
      method: 'post',
      body: JSON.stringify('testdata'),
    })
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
