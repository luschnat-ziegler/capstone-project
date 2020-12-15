import updateUser from './updateUser'

describe('updateUser', () => {
  it('calls fetch once with supplied data', async () => {
    const fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve('testdata'),
      })
    )
    const getToken = jest.fn(() => 'testtoken')

    await updateUser('testdata', fetch, getToken)
    expect(fetch).toHaveBeenCalledWith('http://countrycheck.local/user_update', {
      headers: {
        Authorization: `Bearer testtoken`,
      },
      method: 'post',
      body: JSON.stringify('testdata'),
    })
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})
