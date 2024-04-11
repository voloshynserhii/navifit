const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Update Promocode
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { type, discount, email, dateDue, _id: id } = req.body

  if (Functions.isNull(id) || !Functions.isId(id)) {
    return res.send({
      message: 'No id provided!'
   });
  }

  try {
    const promocode = await db.promocode.findById(id)

    promocode.type = type
    promocode.discount = discount
    promocode.email = email
    promocode.dateDue = dateDue
    
    await promocode.save()
    
    res.json({ promocode })
  } catch (err) {
    console.log(err)
  }
}
