const request = require('request');

const geoCode = (address, callback) => {
    if (!address) {
        return console.log('Please specify address in command line arguments');
    }
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoibWFsYW5pcmlzaGkiLCJhIjoiY2szdzg0OHZtMGp0ejNrbWYxOHh4MjVvbyJ9.Zad6cipQqghoeOaDyqqtVQ&limit=1`;
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to map service');
        } else if (!body.features[0]) {
            callback('No Matching results');
        } else {
            console.log(JSON.stringify(body));
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
}

module.exports = geoCode;
