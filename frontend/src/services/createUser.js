export function createUser(data) {
    return fetch('http://countrycheck.local/user', {
            method: 'post',
            body: JSON.stringify(data)
        }).then(response => response.json())
}