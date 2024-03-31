const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Remove User
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
    const user = await db.user.findById(id)

    if (!user) {
      return res.send({
        message: 'User not found!'
      });
    }

    user.deleted = true

    await user.save()

    res.json({ })
  } catch (err) {
    console.log(err)
  }


}
