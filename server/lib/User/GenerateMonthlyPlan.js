const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Generate Monthly Plan
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
    const { id } = req.params

    if (Functions.isNull(id) || !Functions.isId(id)) {
        return res.send({
            message: 'No id provided!'
        });
    }
    
    const user = await db.user.findById(id)
    
    const { userData } = user

    const breakfasts = await db.recipe.find({ calories: { $gt: 300, $lt: 500 } }).limit(28).lean().exec()
    const branches = await db.recipe.find({ calories: { $gt: 100, $lt: 200 } }).limit(28).lean().exec()
    const lunches = await db.recipe.find({ calories: { $gt: 300, $lt: 500 }, _id: { $nin: breakfasts.map(br => br._id) } }).limit(28).lean().exec()
    const dinners = await db.recipe.find({ calories: { $gt: 300, $lt: 500 }, _id: { $nin: [...breakfasts, ...lunches].map(br => br._id) } }).limit(28).lean().exec()

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
    
    // await user.save()

    res.json({ user })
}
