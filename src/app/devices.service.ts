import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable()
export class DevicesService {

  constructor(private http: HttpClient) { }

  loadDevices()
  {
	  var apiUrl = '/_api/devices/load-devices';
	  return this.http.get(apiUrl);
  }

  locate(ip, port)
  {
	  var apiUrl = '/_api/devices/locate?ip='+ip+'&port='+port;
	  return this.http.get(apiUrl);
  }

  test_ssh(ip, port, user, pass)
  {
	  var apiUrl = '/_api/devices/test_ssh?ip='+ip+'&port='+port+'&user='+user+'&pass='+pass;
	  return this.http.get(apiUrl);
  }

}
