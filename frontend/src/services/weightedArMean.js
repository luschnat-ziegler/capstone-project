export default function weightedArMean(country, user) {
    
    const scoreWeightArray = [
        [country.freedom, user.weightFreedom],
        [country.environment, user.weightEnvironment],
        [country.gender, user.weightGender],
        [country.lgbtq, user.weightLgbtq],
        [country.inequality, user.weightEquality],
        [country.corruption, user.weightCorruption]
    ]

    const [sum, divisor] = scoreWeightArray.reduce((accumulator, current) => {
        if(current[0] === null) {
            return accumulator
        } else {
            return [accumulator[0]+(current[0]*current[1]), accumulator[1]+current[1]]
        }
    },[0,0])

    return divisor !== 0 ? Math.round(sum/divisor) : null
}