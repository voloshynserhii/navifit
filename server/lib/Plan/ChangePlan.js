const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Update User Plan
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const { title, price, promoPrice, duration, _id: id } = req.body

  if (Functions.isNull(id) || !Functions.isId(id)) {
    return res.send({
      message: 'No id provided!'
   });
  }
  
  try {
    const plan = await db.plan.findById(id)

    plan.title = title
    plan.price = price
    plan.promoPrice = promoPrice
    plan.duration = duration
    
    await plan.save()
    
    res.json({ plan })
  } catch (err) {
    console.log(err)
  }


}
