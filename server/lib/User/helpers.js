const dayjs = require('dayjs')

const countUserData = (userData) => {
    const { gender, weight, height, age, training, desiredWeight } = userData
    let { desiredDate } = userData
    
    const totalKalToBurn = (weight - desiredWeight) * 7700
    
    const today = dayjs()
    
    if (!desiredDate) {
      desiredDate = dayjs().add(12, 'M')
    }
    
    const daysNeeded = dayjs(desiredDate).diff(today, 'days')
    const dailyDeficit = totalKalToBurn / daysNeeded
    
    const BMI = Number(weight / (height * height) * 10000).toFixed(2)
    
    let BMR = (10 * weight) + (6.25 * height) - (5 * age)
    
    if (gender === 'male') {
      BMR += 5
    } 
    if (gender === 'female') {
      BMR -= 161
    } 
    
    //training activity
    switch (training) {
      case '1':
        BMR = BMR * 1.2
        break;
      case '2':
        BMR = BMR * 1.375
        break;
      case '3':
        BMR = BMR * 1.55
        break;
      case '4':
        BMR = BMR * 1.725
        break;
      case '5':
        BMR = BMR * 1.9
        break;
      default:
        BMR = BMR * 1.2
    }
    
    const personalDailyKCalNeeded = Math.floor(BMR) - Math.floor(dailyDeficit)
    
    return { BMI, BMR: Math.floor(BMR), personalDailyKCalNeeded }
}

module.exports = {
    countUserData
}