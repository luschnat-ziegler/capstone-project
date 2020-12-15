export function createUser(data, apiFetch = fetch) {
  return apiFetch('http://countrycheck.local/user', {
    method: 'post',
    body: JSON.stringify(data),
  }).then((response) => response.json())
}
