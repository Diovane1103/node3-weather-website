const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/ea0aaceaeadd9450c77d13f215cbfa31/' + encodeURIComponent(lat) + ', ' + encodeURIComponent(long) + '?units=si'

    request({ url, json: true }, (err, { body }) => {
        if(err) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
           callback('Unable to find location!', undefined)
        } else {
            callback(undefined, body.currently.summary + '. It is currently ' + body.currently.temperature + ' degrees out and fells like of ' + body.currently.apparentTemperature + ' degrees. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast