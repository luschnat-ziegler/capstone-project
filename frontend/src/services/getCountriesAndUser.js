import { loadToken } from './tokenStorage'

export default function getCountriesAndUser(apiFetch = fetch) {
  const countriesPromise = apiFetch('http://countrycheck.local/countries').then((result) =>
    result.json()
  )
  const userPromise = apiFetch('http://countrycheck.local/user', {
    headers: {
      Authorization: `Bearer ${loadToken()}`,
    },
  }).then((result) => result.json())

  return Promise.all([countriesPromise, userPromise])
}
