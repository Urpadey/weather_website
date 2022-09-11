const request = require('request')
const forecast = (address, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=455ac1a907b79cadebad72920bac2c06&query=${address.latitude},${address.longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to Weather Service', undefined)
        }
        else {
            if (body.error) {
                callback('Unable to find location', undefined)
            } else {
                callback(undefined, body)
            }
        }
    })
}
module.exports = forecast