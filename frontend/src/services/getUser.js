import { loadToken } from './tokenStorage'

export default function getUser(apiFetch = fetch) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  return apiFetch(`${apiBaseUrl}/user`, {
    headers: {
      Authorization: `Bearer ${loadToken()}`,
    },
  }).then((response) => response.json())
}
