import weightedArMean from './weightedArMean'

export default function calcUserScore (resultArray) {
    let workingArray = [...resultArray]
    if (!resultArray[1].hasOwnProperty('id')) {
        workingArray.push({user: false, custom: false})
        return workingArray
    } else if (checkEquality(resultArray[1])) {
        workingArray.push({user: true, custom: false})
        return workingArray
    } else {
        const customResultArray = resultArray[0].map((country) => {
            const newCountry = country
            newCountry.userScore = weightedArMean(country, resultArray[1])
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
