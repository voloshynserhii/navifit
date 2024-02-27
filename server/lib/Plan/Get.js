const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get Plans
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { data } = req.body
    
    const breakfasts = await db.recipe.find({ calories: { $gt: 300, $lt: 500 } }).limit(28).lean().exec()
    const branches = await db.recipe.find({ calories: { $gt: 100, $lt: 200 } }).limit(28).lean().exec()
    const lunches = await db.recipe.find({ calories: { $gt: 300, $lt: 500 }, _id: { $nin: breakfasts.map(br => br._id) } }).limit(28).lean().exec()
    const dinners = await db.recipe.find({ calories: { $gt: 300, $lt: 500 },_id: { $nin: [...breakfasts, ...lunches].map(br => br._id) } }).limit(28).lean().exec()
    
    const month = {
        week1: [],
        week2: [],
        week3: [],
        week4: [],
    }
    
    breakfasts.forEach((breakfast, i) => {
        let day = {}
        day.breakfast = breakfast
        day.branch = branches[i]
        day.lunch = lunches[i]
        day.dinner = dinners[i]
        
        if (month.week1.length < 7) {
            month.week1.push(day)
        } else if (month.week2.length < 7) {
            month.week2.push(day)
        } else if (month.week3.length < 7) {
            month.week3.push(day)
        } else {
            month.week4.push(day)
        }
    })

    res.json({ month })
}
