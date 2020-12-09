import {validateEmail, validateRegistration} from './validations'

// Tests for validateEmail

test('validateEmail checks for @', () => {
    expect(validateEmail('test.test.de')).toBe(false)
})

test('validateEmail checks for domain', () => {
    expect(validateEmail('test@test')).toBe(false)
})

test('validateEmail returns true if domain is valid and @ present', () => {
    expect(validateEmail('test@test.de')).toBe(true)
})

// Tests for validateRegistration

const regData = {
    firstName: 'Testy', 
    lastName: 'McTestface', 
    email: 'testy@test.de', 
    password: 'test'
}

const regDataWrongEmail = {
    ...regData,
    email: "invalid_email"
}

const regDataWrongFirstName = {
    ...regData,
    firstName: "t"
}

const regDataWrongLastName = {
    ...regData,
    lastName: ""
}

const regDataWrongPassword = {
    ...regData,
    password: "@"
}

test('E-Mail invalid -> returns false', () => {
    expect(validateRegistration(regDataWrongEmail)).toBe(false)
})

test('firstName shorter than 2 -> returns false', () => {
    expect(validateRegistration(regDataWrongFirstName)).toBe(false)
})

test('lastName shorter than 2 -> returns false', () => {
    expect(validateRegistration(regDataWrongLastName)).toBe(false)
})

test('Password shorter than 2 -> returns false', () => {
    expect(validateRegistration(regDataWrongPassword)).toBe(false)
})

test('All valid data -> returns true', () => {
    expect(validateRegistration(regData)).toBe(true)
})