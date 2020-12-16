import { loadToken } from './tokenStorage'

export default function getCountriesAndUser(apiFetch = fetch) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  console.log(apiBaseUrl)

  const countriesPromise = apiFetch(`${apiBaseUrl}/countries`).then((result) => result.json())
  const userPromise = apiFetch(`${apiBaseUrl}/user`, {
    headers: {
      Authorization: `Bearer ${loadToken()}`,
    },
  }).then((result) => result.json())

  return Promise.all([countriesPromise, userPromise])
}
