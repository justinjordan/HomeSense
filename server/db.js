var MongoClient = require('mongodb').MongoClient;

class DB
{
	constructor()
	{
		this.connected = false;

		var url = 'mongodb://localhost:27017/homeSense';
		// connect
		MongoClient.connect(url, (err, db) => {
			if (err)
				{ return; }

			this.db = db;
			this.connected = true;
		});
	}

	getDevices(mac)
	{
		if (mac)
		{
			return this.db.collection('devices').findOne({mac:mac});
		}

		return this.db.collection('devices').find().toArray();
	}

	registerDevice(mac)
	{
		return new Promise((resolve, reject) => {
			// this.db.collection('devices').findOneAndUpdate({mac:mac}, {mac:mac}, {upsert: true}).then(resolve, reject);
			this.db.collection('devices').findOne({mac:mac}).then((result) => {
				if (!result)
				{
					this.db.collection('devices').insertOne({
						label: 'Host',
						mac: mac,
						sensors: [],
					}).then(resolve, reject);
				}

				resolve(result);
			}, reject);
		});
	}

	// install(db)
	// {
	// 	return new Promise(resolve, reject)
	// 	{
	// 		// do collections exist
	// 	};
	// }
}

module.exports = new DB();
