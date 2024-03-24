const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get Plans
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const plan = req.body

    if (Functions.isNull(plan) || !Functions.isObject(plan)) {
        return res.send({
          message: 'No plan data provided!'
       });
      }
      
    try {
        const newPlan = new db.plan(plan)
    
        await newPlan.save()
        
        res.json({ plan: newPlan })
      } catch (err) {
        console.log(err)
      }

}
