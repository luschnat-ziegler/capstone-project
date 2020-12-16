import { loadToken } from './tokenStorage'

export default function updateUser(data, apiFetch = fetch, getToken = loadToken) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  return apiFetch(`${apiBaseUrl}/user_update`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    method: 'post',
    body: JSON.stringify(data),
  }).then((response) => response.json())
}
