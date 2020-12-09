export default function weightedArMean(country, user) {
    
    const scoreWeightArray = [
        [country.freedom, user.weightFreedom],
        [country.environment, user.weightEnvironment],
        [country.gender, user.weightGender],
        [country.lgbtq, user.weightLgbtq],
        [country.inequality, user.weightEquality],
        [country.corruption, user.weightCorruption]
    ]

    const [sum, divisor] = scoreWeightArray.reduce((acc, cur) => {
        if(cur[0] === null) {
            return acc
        } else {
            return [acc[0]+(cur[0]*cur[1]), acc[1]+cur[1]]
        }
    },[0,0])

    return divisor !== 0 ? Math.round(sum/divisor) : null
}