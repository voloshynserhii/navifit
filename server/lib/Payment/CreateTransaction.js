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
    const { access_token } = req.body

    if (Functions.isNull(access_token) || !Functions.isString(access_token)) {
        return res.send({
            message: 'Should provide Access Token!'
        });
    }

    try {
        const { data = {} } = await axios.post(`${config.payment.uri}/transactions`, {
            "amount": 12.34,
            "description": "Test transaction",
            "hiddenDescription": "123456",
            "lang": "en",
            "payer": {
              "email": "jan.kowalski@example.com",
              "name": "Jan Kowalski",
              "phone": "00123456",
              "address": "ul. Przykładowa 44b/2",
              "code": "00-001",
              "city": "Warszawa",
              "country": "PL",
              "taxId": "PL3774716081"
            },
            "pay": {
              "groupId": 150,
              "method": "pay_by_link",
              "blikPaymentData": {
                "blikToken": "123456",
                "aliases": {
                  "value": "TPAY_ALIAS_1",
                  "type": "UID",
                  "label": "TPAY_ALIAS_1",
                  "key": "1"
                },
                "type": 0
              },
              "cardPaymentData": {
                "card": "VEJUfiiBqj8huhZfi84UWBHFwyVJCeanbF6zJDtWwoW9ugQB+x7MzESIgic1Bw7YBW1Yc1i49UeR+IhmXsFQiWh6aS35KyG1q\n2RrVN+NWYJDQEvvDpISyYdCghFjjLCXL2Fkp5KeLfUTWkKOMeisr/b3/Gbup37XA7DTYX8gn4Es/KO0PdiI/brO+S5+YrX4/UcQOT+eosL7r7rSSJfe8KaT\n8GywyoaWl8S41Cw1B41ddkGKvDOSIbbatALi3TdjJrHe7SkVmYSZNbkb9ri1RBw9ceX2QVGeO4CKKido29ySgWm64Gqfk4pgGBFqqUc8/ThwCI3n+FCmtWx\nntCovtw==",
                "token": "t59c2810d59285e3e0ee9d1f1eda1c2f4c554e24",
                "save": 1,
                "rocText": "abc123"
              },
              "tokenPaymentData": {
                "tokenValue": "t59c2810d59285e3e0d",
                "cardExpiryDate": "2808",
                "initialTransactionId": "1234567891B345678912",
                "cardBrand": "VI",
                "rocText": "abc123"
              },
              "cof": "unscheduled",
              "applePayPaymentData": "ewogICJkYXRhIjogInh4eHgiLAogICJzaWduYXR1cmUiOiAieHh4eCIsCiAgImhlYWRlciI6IHsKICAgICJwdWJsaWNLZXlIY\nXNoIjogInh4eHgiLAogICAgImVwaGVtZXJhbFB1YmxpY0tleSI6ICJ4eHh4IiwKICAgICJ0cmFuc2FjdGlvbklkIjogInh4eHgiCiAgfSwKICAidmVyc2lv\nbiI6ICJFQ192MSIKfQo"
            },
            "callbacks": {
              "payerUrls": {
                "success": "https://test.tpay.com/payment_success",
                "error": "https://test.tpay.com/payment_error"
              },
              "notification": {
                "url": "https://test.tpay.com/callback",
                "email": "jan.kowalski@example.com"
              }
            }
          }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            }
        })
console.log(data)
        res.json({ data })
    } catch (err) {
        // console.log(err)
    }
}
