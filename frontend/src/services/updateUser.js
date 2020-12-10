import { loadToken } from './tokenStorage'

export default function updateUser(data) {
return fetch('http://countrycheck.local/user_update', {
            headers: {
                Authorization: `Bearer ${loadToken()}`
            },
            method: 'post',
            body: JSON.stringify(data) 
        }).then(response => response.json())
    }
