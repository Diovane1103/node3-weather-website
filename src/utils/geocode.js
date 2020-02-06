const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGlvdmFuZXJvc3NhdG8iLCJhIjoiY2s2NnVnNmE4MXBqYTNlb2Y5a2lzZWZodiJ9.SM77Kna6CQnm5VQpcFQrEA'

    request({ url, json: true }, (err, { body }) => {
        if(err){
            callback('Unable to connect with map box service!', undefined)
        } else if (body.features.length === 0){
            callback('Unable to find the address disposed!', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                name: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode