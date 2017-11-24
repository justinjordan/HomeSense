class SensorMonitor
{
	start(callback, interval)
	{
		if (!global.db.connected)
		{
			setTimeout(() => {
				this.start(callback, interval);
			}, 500);
			return;
		}

		global.db.getDevices().then((devices) => {
			this.interval = setInterval(() => {
				devices.forEach((device, i) => {
					// check device
					device.sensors.forEach((sensor) => {
						// check sensor
					});
				});
			}, interval||500);
		}, console.err);
	}

	stop()
	{
		clearInterval(this.interval);
	}
}

module.exports = SensorMonitor;
