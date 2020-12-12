const hasValidDomain = (email) => {
  const parts = email.split('.')
  return parts.length > 1 && parts[parts.length - 1].length > 1
}

const validateEmail = (email) => email.includes('@') && hasValidDomain(email)

const validatePassword = (password) => password.length > 1 && password.length < 256
const validateName = (name) => name.length > 1 && name.length < 256

const validateRegistration = ({ firstName, lastName, email, password }) => {
  return (
    validateEmail(email) &&
    validateName(lastName) &&
    validateName(firstName) &&
    validatePassword(password)
  )
}

export { validateEmail, validateRegistration }
