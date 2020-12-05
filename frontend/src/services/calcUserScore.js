export default function calcUserScore (resultArray) {
    if (!resultArray[1].hasOwnProperty('id')) {
        resultArray.push({user: false, custom: false})
        return resultArray
    } else if (checkEquality(resultArray[1])) {
        resultArray.push({user: true, custom: false})
        return resultArray
    } else {
        const customResultArray = resultArray[0].map(country => {
            const newCountry = country
            newCountry.userScore = customScore(country, resultArray[1])
            return newCountry
        })
        return [customResultArray, resultArray[1], {user: true, custom: true}]
    }
}

function checkEquality(userObj) {
    const compSet = new Set([
        userObj.weightEnvironment, 
        userObj.weightEquality, 
        userObj.weightFreedom, 
        userObj.weightGender, 
        userObj.weightLgbtq,
        userObj.weightCorruption
    ])
    return (compSet.size === 1)
}

function customScore(country, userObj) {

    let divisor = 0
    let sum = 0

    if (country.corruption !== null) {
        sum += country.corruption*userObj.weightCorruption
        divisor += userObj.weightCorruption
    }
    if (country.freedom !== null) {
        sum += country.freedom*userObj.weightFreedom
        divisor += userObj.weightFreedom
    }
    if (country.lgbtq !== null) {
        sum += country.lgbtq*userObj.weightLgbtq
        divisor += userObj.weightLgbtq
    }
    if (country.inequality !== null) {
        sum += country.inequality*userObj.weightEquality
        divisor += userObj.weightEquality
    }
    if (country.environment !== null) {
        sum += country.environment*userObj.weightEnvironment
        divisor += userObj.weightEnvironment
    }
    if (country.gender !== null) {
        sum += country.gender*userObj.weightGender
        divisor += userObj.weightGender
    }

    return Math.floor(sum/divisor)
}