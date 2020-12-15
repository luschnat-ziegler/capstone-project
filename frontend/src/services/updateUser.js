import { loadToken } from './tokenStorage'

export default function updateUser(data, apiFetch = fetch, getToken = loadToken) {
  return apiFetch('http://countrycheck.local/user_update', {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    method: 'post',
    body: JSON.stringify(data),
  }).then((response) => response.json())
}
