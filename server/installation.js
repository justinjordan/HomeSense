var ApiRouting = require('./apirouting');

class Installation extends ApiRouting
{
	main()
	{
		return new Promise((resolve, reject) => {
			resolve('This is installation.main()');
		});
	}

	routing_is_cool()
	{
		return new Promise((resolve, reject) => {
			resolve('Yeah, but will I even need this???');
		});
	}
}

module.exports = Installation;
