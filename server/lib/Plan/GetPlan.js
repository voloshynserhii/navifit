const moment = require('moment')
const Functions = require('../../util/Functions')
const db = require('../../db')
const { generatePlan } = require('../../util/PlansUtil')

/**
 * Get User Plan
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { id } = req.body

    if (Functions.isNull(id) || !Functions.isId(id)) {
        return res.send({
          message: 'No id provided!'
       });
      }
      
    const user = await db.user.findById(id).select({ currentPlan: 1, lastGenerated: 1, userData: 1 })

    if (!user.currentPlan) {
        const month = await generatePlan(user.userData)
        
        user.currentPlan = month
        user.lastGenerated = moment()
        
        user.save()
    }

    res.json({ month: user.currentPlan })
}
