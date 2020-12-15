import { createUser } from './createUser'

describe('createUser', () => {
  it('calls fetch once with supplied data', async () => {
    const fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('testdata'),
      })
    )

    await createUser('testdata', fetch)
    expect(fetch).toHaveBeenCalledWith('http://countrycheck.local/user', {
      method: 'post',
      body: JSON.stringify('testdata'),
    })
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
