import { Component, Inject, OnInit } from '@angular/core';
import {
	MatDialog,
	MatDialogRef,
	MAT_DIALOG_DATA,
	MatProgressSpinner,
} from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewDeviceComponent } from '../new-device/new-device.component';
import { DevicesService } from '../devices.service';

class Device
{
	constructor(public label: string, public mac: string)
	{

	}
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

	loading: Boolean = true;
	devices: Array<Device>;

	constructor(public dialog: MatDialog, private devicesService: DevicesService)
	{
		this.devices = [];
	}

	ngOnInit() {
		this.loadDevices();
	}

	loadDevices()
	{
		this.devicesService.loadDevices().subscribe((data: {result, error}) => {
			for (var i in data.result)
			{
				let d = data.result[i];
				this.devices.push(new Device(d.label, d.mac));
			}

			this.loading = false;
		}, (err) => {
			console.error(err);
		});
	}

	newDeviceDialog(): void
	{
		let dialogRef = this.dialog.open(NewDeviceComponent, {
			width: '600px',
			data: {}
		});
	}

}
