const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Remove promocode
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
    const promocode = await db.promocode.findById(id)

    promocode.deleted = true
    
    await promocode.save()
    
    res.json({ })
  } catch (err) {
    console.log(err)
  }


}
