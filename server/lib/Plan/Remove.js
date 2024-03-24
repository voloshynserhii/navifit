const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
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
  
  try {
    const plan = await db.plan.findById(id)

    plan.deleted = true
    
    await plan.save()
    
    res.json({ })
  } catch (err) {
    console.log(err)
  }


}
