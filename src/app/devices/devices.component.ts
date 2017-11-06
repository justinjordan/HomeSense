import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewDeviceComponent } from '../new-device/new-device.component';

class Device
{
	constructor(public id: number, public label: string, public mac: string)
	{

	}
}

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

	devices: Array<Device>;

	constructor(public dialog: MatDialog)
	{
		this.devices = [];
	}

	ngOnInit() {
		this.devices.push(new Device(1, 'Entryway', '00:C0:CA:75:0B:38'));
		this.devices.push(new Device(2, 'Bedroom', '00:C0:CA:75:0B:38'));
		this.devices.push(new Device(3, 'Bathroom...?', '00:C0:CA:75:0B:38'));
	}

	newDeviceDialog(): void
	{
		let dialogRef = this.dialog.open(NewDeviceComponent, {
			width: '600px',
			data: {}
		});
		// let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
		// 	width: '250px',
		// 	data: { name: this.name, animal: this.animal }
		// });
		//
		// dialogRef.afterClosed().subscribe(result => {
		// 	console.log('The dialog was closed');
		// 	this.animal = result;
		// });
	}

}
