// 37. Callback Abstraction Challenge

const request = require('postman-request');

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=e36bc44aeb236dda71edac9628fac8c9&query=' +
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
					'%.'
			);
		}
	});
};

module.exports = forecast;
