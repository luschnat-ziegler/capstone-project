import { loadToken } from './tokenStorage'

export default function getUser() {
  return fetch('http://countrycheck.local/user', {
    headers: {
      Authorization: `Bearer ${loadToken()}`,
    },
  }).then((response) => response.json())
}
