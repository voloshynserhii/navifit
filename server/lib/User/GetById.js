const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Get User by id
 * @param req
 * @param res
 */
module.exports = async(req, res) => {
    const { id } = req.query
    
    if (Functions.isNull(id) || !Functions.isId(id)) {
        return res.send({
            message: 'No id provided!'
        });
    }
    
    const user = await db.user.findById(id).lean().exec()

    res.json({ user })
}