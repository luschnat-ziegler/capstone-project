import calcUserScore from './calcUserScore'

const userLoggedInNoCustom = [
  [
    {
      corruption: 6,
      country: 'Afghanistan',
      environment: null,
      freedom: 27,
      gender: 32,
      id: 1,
      inequality: null,
      lgbtq: 16,
      region: 'Asia',
      total: 20,
    },
    {
      corruption: 31,
      country: 'Albania',
      environment: 58,
      freedom: 67,
      gender: 75,
      id: 2,
      inequality: 76,
      lgbtq: 27,
      region: 'Europe',
      total: 56,
    },
  ],
  {
    email: 'test@web.de',
    firstName: 'Testy',
    id: 12,
    lastName: 'McTestFace',
    weightCorruption: 2,
    weightEnvironment: 2,
    weightEquality: 2,
    weightFreedom: 2,
    weightGender: 2,
    weightLgbtq: 2,
  },
]

const userLoggedInCustom = [
  userLoggedInNoCustom[0],
  {
    email: 'test@web.de',
    firstName: 'Testy',
    id: 12,
    lastName: 'McTestFace',
    weightCorruption: 2,
    weightEnvironment: 2,
    weightEquality: 1,
    weightFreedom: 3,
    weightGender: 3,
    weightLgbtq: 2,
  },
]

const userNotLoggedIn = [
  userLoggedInCustom[0],
  {
    loggedIn: false,
  },
]

const countriesWithUserScore = [
  {
    corruption: 6,
    country: 'Afghanistan',
    environment: null,
    freedom: 27,
    gender: 32,
    id: 1,
    inequality: null,
    lgbtq: 16,
    region: 'Asia',
    total: 20,
    userScore: 22,
  },
  {
    corruption: 31,
    country: 'Albania',
    environment: 58,
    freedom: 67,
    gender: 75,
    id: 2,
    inequality: 76,
    lgbtq: 27,
    region: 'Europe',
    total: 56,
    userScore: 56,
  },
]

test('No logged in user found -> returns input with pushed status', () => {
  expect(calcUserScore(userNotLoggedIn)).toEqual([
    ...userNotLoggedIn,
    { user: false, custom: false },
  ])
})

test('User logged in but no custom weights -> returns input with pushed status', () => {
  expect(calcUserScore(userLoggedInNoCustom)).toEqual([
    ...userLoggedInNoCustom,
    { user: true, custom: false },
  ])
})

test('User logged in with custom weights -> returns input with modified country data', () => {
  expect(calcUserScore(userLoggedInCustom)).toEqual([
    countriesWithUserScore,
    userLoggedInCustom[1],
    { user: true, custom: true },
  ])
})
