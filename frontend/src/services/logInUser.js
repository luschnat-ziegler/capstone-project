export default function logInUser(data) {
  return fetch('http://countrycheck.local/login', {
    method: 'post',
    body: JSON.stringify(data),
  }).then((response) => response.json())
}
