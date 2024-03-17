const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get Plans
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { pagination, limit = 20 } = req.query

    const data = await db.plan.find({ deleted: { $ne: true } }).lean().exec()
    
    res.json({ data })
}
