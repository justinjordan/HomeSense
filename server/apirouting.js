class ApiRoute
{
	constructor(data, resolve, reject)
	{
		try
		{
			var action = data.params.shift();
			var params = data.params;

			this.data = {
				action: action,
				params: params,
			};

			if (typeof this[action] === 'function')
				{ this[action]().then(resolve, reject); }
			else if (typeof this.main === 'function')
				{ this.main().then(resolve, reject); }
			else
				{ throw new Error("No route specified."); }

		}
		catch (e)
		{
			reject(e.message);
		}

	}
}

module.exports = ApiRoute;
