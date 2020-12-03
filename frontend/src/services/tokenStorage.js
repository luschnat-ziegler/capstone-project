export const saveToken = (tokenValue) => {
    localStorage.setItem('token', tokenValue);
}

export const loadToken = () => {
    return localStorage.getItem('token')
}