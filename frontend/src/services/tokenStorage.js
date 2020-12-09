const saveToken = (tokenValue) => {
    localStorage.setItem('token', tokenValue);
}

const loadToken = () => {
    return localStorage.getItem('token')
}

const deleteToken = () => {
    localStorage.removeItem('token')
}

export {saveToken, loadToken, deleteToken}