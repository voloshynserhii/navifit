const voucher_codes = require('voucher-code-generator');
const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Create Promocode
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
  const promocode = req.body

  if (Functions.isNull(promocode) || !Functions.isObject(promocode)) {
    return res.send({
      message: 'No promocode data provided!'
    });
  }

  try {
    const arr = voucher_codes.generate({
      length: 4,
      count: 4
    })
    
    const code = arr.join('-')

    const newPromocode = new db.promocode({ ...promocode, code })

    await newPromocode.save()

    res.json({ promocode: newPromocode })
  } catch (err) {
    console.log(err)
  }

}
