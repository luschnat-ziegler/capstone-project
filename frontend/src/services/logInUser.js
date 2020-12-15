export default function logInUser(data, apiFetch = fetch) {
  return apiFetch('http://countrycheck.local/login', {
    method: 'post',
    body: JSON.stringify(data),
  }).then((response) => response.json())
}
