const hasValidDomain = (email) => {
    const parts = email.split('.')
    return parts.length > 1 && parts[parts.length-1].length > 1
} 

export const validateEmail = (email) => email.includes('@') && hasValidDomain(email)

const validateText = (text) => text.length > 1

export const validateRegistration = ({firstName, lastName, email, password}) => {
    return validateEmail(email) && validateText(lastName) && validateText(firstName) && validateText(password)
}