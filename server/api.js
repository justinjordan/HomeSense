var ApiRouting = require('./apirouting');
var Devices = require('./devices');

class Api extends ApiRouting
{
	main()
	{
		return new Promise((resolve, reject) => {
			resolve('This is api.main()');
		});
	}

	devices()
	{
		return new Promise((resolve, reject) => {
			var devices = new Devices(this.data, resolve, reject);
		});
	}
}

module.exports = Api;
