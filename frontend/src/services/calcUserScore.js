import weightedArMean from './weightedArMean'

export default function calcUserScore (inputData) {
    let workingData = [...inputData]
    if (!inputData[1].hasOwnProperty('id')) {
        workingData.push({user: false, custom: false})
        return workingData
    } else if (checkEquality(inputData[1])) {
        workingData.push({user: true, custom: false})
        return workingData
    } else {
        const customResultArray = inputData[0].map((country) => {
            const newCountry = country
            newCountry.userScore = weightedArMean(country, inputData[1])
            return newCountry
        })
        return [customResultArray, inputData[1], {user: true, custom: true}]
    }
}

function checkEquality(user) {
    const compSet = new Set([
        user.weightEnvironment, 
        user.weightEquality, 
        user.weightFreedom, 
        user.weightGender, 
        user.weightLgbtq,
        user.weightCorruption
    ])
    return (compSet.size === 1)
}
