import { loadToken } from './tokenStorage'

export default function getCountriesAndUser() {
  const countriesPromise = fetch('http://countrycheck.local/countries').then((result) =>
    result.json()
  )
  const userPromise = fetch('http://countrycheck.local/user', {
    headers: {
      Authorization: `Bearer ${loadToken()}`,
    },
  }).then((result) => result.json())

  return Promise.all([countriesPromise, userPromise])
}
