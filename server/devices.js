var ApiRouting = require('./apirouting');
var Installation = require('./installation');

class Devices extends ApiRouting
{
	main()
	{
		return new Promise((resolve, reject) => {
			resolve("This is devices.main()");
		});
	}

	testing()
	{
		return new Promise((resolve, reject) => {
			resolve("This is devices.testing()");
		});
	}

	installation()
	{
		return new Promise((resolve, reject) => {
			var installation = new Installation(this.data, resolve, reject);
		});
	}
}

module.exports = Devices;
