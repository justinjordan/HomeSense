var ApiRouting = require('./apirouting');
// var Installation = require('./installation');

var nmap = require('node-nmap');
var SSH = require('ssh2').Client;

class Devices extends ApiRouting
{
	main()
	{
		return new Promise((resolve, reject) => {
			resolve("This is devices.main()");
		});
	}

	load_devices()
	{
		return new Promise((resolve, reject) => {

			// Get this device
			require('getmac').getMac((err, macAddress) => {
				if (!macAddress)
				{
					reject("Couldn't find MAC of host device!");
					return;
				}

				global.db.registerDevice(macAddress).then(() => {
					global.db.getDevices().then(resolve);
				}, reject);
			});
		});
	}

	locate()
	{
		return new Promise((resolve, reject) => {

			var scan_query, options;

			if (typeof this.data.req.query.ip !== 'undefined')
			{
				var port = (typeof this.data.req.query.port !== 'undefined' ? this.data.req.query.port : 22);
				scan_query = this.data.req.query.ip;
				options = [
					'-p ['+port+'-'+port+']'
				];
			}
			else
			{
				if (!this.data.server_info.addr)
				{
					reject("Couldn't retrieve server IP.");
					return;
				}

				var addr = this.data.server_info.addr.split('.');
				scan_query = addr[0]+'.'+addr[1]+'.'+addr[2]+'.0/24';
				options = [
					'-sP'
				];
			}

			var scan = new nmap.NmapScan(scan_query, options);

			scan.on('complete', resolve);
			scan.on('error', reject);
		});
	}

	test_ssh(args)
	{
		return new Promise((resolve, reject) => {

			switch ('undefined')
			{
				case typeof args.ip:
				case typeof args.port:
				case typeof args.user:
				case typeof args.pass:
					reject('Missing IP, Port, User, or Pass!');
					return;
				break;
			}

			var ssh = new SSH();
			var stdout = '';
			var stderr = '';
			ssh.on('ready', () => {
				ssh.exec('echo "ssh connection successful"', (err, stream) => {
					if (err)
					{
						reject(err);
						return;
					}

					stream.on('close', (code, signal) => {
						if (stderr!=='')
							{ reject(stderr); }
						else
							{ resolve(stdout); }
						ssh.end();
					}).on('data', (data) => {
						stdout += data;
					}).stderr.on('data', (data) => {
						stderr += data;
					});
				});
			}).on('error', reject).connect({
				host: args.ip,
				port: args.port,
				username: args.user,
				password: args.pass,
				// privateKey: require('fs').readFileSync('/here/is/my/key')
			});
		});
	}

	installation(args)
	{
		return new Promise((resolve, reject) => {

			switch ('undefined')
			{
				case typeof args.ip:
				case typeof args.port:
				case typeof args.user:
				case typeof args.pass:
					reject('Missing IP, Port, User, or Pass!');
					return;
				break;
			}


		});
	}
}

module.exports = Devices;
