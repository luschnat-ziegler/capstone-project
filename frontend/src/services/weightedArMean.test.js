import weightedArMean from './weightedArMean'

const userData = {
    weightFreedom: 4,
    weightEnvironment: 2,
    weightGender: 1,
    weightLgbtq: 2,
    weightEquality: 3,
    weightCorruption: 1
}

const userDataMisaligned = {
    weightFreedom: 0,
    weightEnvironment: 2,
    weightGender: 1,
    weightLgbtq: 0,
    weightEquality: 0,
    weightCorruption: 0
}

const countryNoNull = {
    freedom: 56,
    environment: 23,
    gender: 45,
    lgbtq: 12,
    inequality: 90,
    corruption: 56
}

const countryNull = {
    freedom: 56,
    environment: null,
    gender: null,
    lgbtq: 12,
    inequality: 90,
    corruption: 56
}

test('No null values -> returns weighted arithmetic mean', () => {
    expect(weightedArMean(countryNoNull, userData)).toBe(51)
  })

test('Null values -> returns weighted arithmetic mean of not null values', () => {
    expect(weightedArMean(countryNull, userData)).toBe(57)
})

test('Null values coincide with all user weights > 0', () => {
    expect(weightedArMean(countryNull, userDataMisaligned)).toBe(null)
})