// 37. Callback Abstraction Challenge

const request = require('postman-request');
const forecastAccessKey = process.env.access_key;

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?' +
        forecastAccessKey +
        '&query=' +
		latitude +
		', ' +
		longitude +
		'&units=f';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			callback(
				undefined,
				body.current.weather_descriptions[0] +
					'. It is current ' +
					body.current.temperature +
					' It feels like ' +
					body.current.feelslike +
					' degress out. The humidity is ' +
					body.current.humidity +
					'% ' +
					body.location.localtime
			);
		}
	});
};

module.exports = forecast;
