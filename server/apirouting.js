class ApiRoute
{
	constructor(data, resolve, reject)
	{
		try
		{
			this.data = data;

			var action = data.params.shift().replace(/-/ig, '_').replace(/[^0-9a-z_]/ig, '');
			console.log(action);
			var params = data.params;

			this.data.action = action;
			this.data.params = params;

			var args = (typeof this.data.req !== 'undefined' ? this.data.req.query : null);
			if (typeof this[action] === 'function')
				{ this[action](args).then(resolve, reject); }
			else if (typeof this.main === 'function')
				{ this.main(args).then(resolve, reject); }
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
