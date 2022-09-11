const request = require('request')
const geocoding = (address, callback) => {
    let url = 'http://api.positionstack.com/v1/forward?access_key=92a4b5f5512a86546ca539bf83fb42d3&query='
    url = url + encodeURIComponent(address);
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Problem connecting to the internet !!! 😔', undefined)
        }
        else {
            if (body.error) {
                callback(`${body.error.context?.query?.message}`, undefined)
            }
            else {
                if (!body.data.length) {
                    callback('No Location found by that name', undefined)
                }
                else {
                    const { latitude, longitude } = body.data[0]
                    callback(undefined, {
                        latitude: latitude,
                        longitude: longitude
                    })
                }
            }
        }
    })

}
module.exports = geocoding