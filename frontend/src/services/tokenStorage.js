export const saveToken = (tokenValue) => {
    localStorage.setItem('token', tokenValue);
}

export const loadToken = () => {
    return localStorage.getItem('token')
}

export const deleteToken = () => {
    localStorage.removeItem('token')
}