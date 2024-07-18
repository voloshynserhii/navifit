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
        const { data = {} } = await axios.post(`${config.payment.uri}/transactions`, {
            "amount": Number(chosenPlan.price.replace(',', '.')),
            "description": chosenPlan.title || `Order meal plan for ${chosenPlan.duration} months`,
            "hiddenDescription": "order_1",
            "lang": "en",
            "payer": {
              "email": "test@navifit.com",
              "name": cardDetails.cardOwner,
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
              "groupId": 150,
              "method": "pay_by_link"
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
