const axios = require('axios')
const config = require('../../config')
const Functions = require('../../util/Functions')
const db = require('../../db')

/**
 * Post User Data
 * @param req
 * @param res
 */
module.exports = async (req, res) => {
    const { access_token, cardDetails, chosenPlan } = req.body

    if (Functions.isNull(access_token) || !Functions.isString(access_token)) {
        return res.send({
            message: 'Should provide Access Token!'
        });
    }

    try {
        const channels = await axios.get(`${config.payment.uri}/transactions/channels`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        }
        })
        console.log('Channels', channels.data.channels)
        const { data = {} } = await axios.post(`${config.payment.uri}/transactions`, {
            "amount": Number(chosenPlan.price.replace(',', '.')),
            "description": chosenPlan.title || `Order meal plan for ${chosenPlan.duration} months`,
            "hiddenDescription": "order_1",
            "lang": "en",
            "payer": {
              "email": "test@navifit.com",
              "name": "test@navifit.com",
            },
            "callbacks": {
              "payerUrls": {
                "success": `${process.env.PORTAL_URI}/signup?email=test@navifit.com`,
                "error": `${process.env.PORTAL_URI}/`
              },
              "notification": {
                "url": "https://test.tpay.com/callback",
                "email": "vosquery@gmail.com"
              }
            },
            "pay": {
              "channelId": 53
              // "groupId": 150,
              // "method": "pay_by_link"
            }
          }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })

        const { transactionPaymentUrl, result } = data
        
        if (result === 'success') {
          return res.json({ transactionPaymentUrl })
        }

        res.json({ data })
    } catch (err) {
        console.log(err.response.data)
    }
}
