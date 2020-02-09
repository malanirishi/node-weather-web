const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/f021f4d9d10a6f20deaf0b8c3d3425cd/${latitude},${longitude}`;
    request({ url, json: true }, (error, { body: { error: apiError, currently: { precipProbability, temperature, apparentTemperature } } }) => {
        if (error) {
            callback('Unable to connect to weather service');
        } else if(apiError) {
            callback('Unable to find location');
        } else {
            callback(undefined, `There is currently ${precipProbability}% chances of rain and ${temperature} F temperature with feels like ${apparentTemperature} F`);
        }
    });
};

module.exports = forecast;
