export default function logInUser(data, apiFetch = fetch) {
  const apiBaseUrl = process.env.REACT_APP_API_BASE_URL
  return apiFetch(`${apiBaseUrl}/login`, {
    method: 'post',
    body: JSON.stringify(data),
  }).then((response) => response.json())
}
