import { loadToken } from './tokenStorage'

export default function getUser(apiFetch = fetch) {
  return apiFetch('http://countrycheck.local/user', {
    headers: {
      Authorization: `Bearer ${loadToken()}`,
    },
  }).then((response) => response.json())
}
