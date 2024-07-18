const axios = require('axios')
const config = require('../../config')

/**
 * Auth in TPay system
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
    try {
        const { data = {} } = await axios.post(`${config.payment.uri}/oauth/auth`, {
            "client_id": config.payment.client_id,
            "client_secret": config.payment.client_secret,
            "scope": "read write"
        }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        res.json({ data })
    } catch (error) {
        console.log(error)
        res.json({ error })
    }
}
