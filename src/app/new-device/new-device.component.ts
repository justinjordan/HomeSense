import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DevicesService } from '../devices.service';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

	@ViewChild('stepper') stepper;

	serverError: string;

	locateRunning: boolean = false;
	sshRunning: boolean = false;

	locateCompleted: boolean = false;
	locateGroup: FormGroup;
	sshGroup: FormGroup;

	deviceData: {ip: string, ssh_port: number, user: string, pass: string} = {ip: '', ssh_port: 22, user: '', pass: ''};

	constructor(public dialogRef: MatDialogRef<NewDeviceComponent>, private _formBuilder: FormBuilder, private devicesService: DevicesService) { }

	ngOnInit()
	{
		this.locateGroup = this._formBuilder.group({
			ipCtrl: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$')]],
			sshPortCtrl: ['', [Validators.required, Validators.pattern('[0-9]+')]],
		});
		this.sshGroup = this._formBuilder.group({
			sshUserCtrl: ['pi', [Validators.required]],
			sshPassCtrl: ['raspberry', [Validators.required]],
		});
	}

	locate()
	{
		if (!this.locateGroup.valid)
			{ return; }

		this.locateRunning = true;

		this.devicesService.locate(this.deviceData.ip, this.deviceData.ssh_port).subscribe((data: {result, error}) => {
			// error
			if (typeof data.result === 'undefined' || data.result.length === 0)
			{
				// failure
				this.locateRunning = false;
				this.deviceData.ip = '';
				this.serverError = "Device not found!";
				return;
			}

			// success
			this.stepper.next();
			setTimeout(() => {
				this.locateRunning = false;
			}, 1000);
		});
	}

	test_ssh()
	{
		if (!this.sshGroup.valid)
			{ return; }

		this.sshRunning = true;

		this.devicesService.test_ssh(this.deviceData.ip, this.deviceData.ssh_port, this.deviceData.user, this.deviceData.pass).subscribe((data: {result, error}) => {
			// error
			if (typeof data.result === 'undefined' || data.result.indexOf('ssh connection successful') === -1)
			{
				// failure
				this.sshRunning = false;
				this.serverError = "SSH credentials invalid!";
				return;
			}

			// success
			this.stepper.next();
			setTimeout(() => {
				this.sshRunning = false;
			}, 1000);
		});
	}

	getValidationError(ctrl)
	{
		if (this.serverError)
			{ return this.serverError; }
		if (ctrl.hasError('required'))
			{ return "Field is required."; }
		if (ctrl.hasError('pattern'))
			{ return "Field is invalid."; }
		return "There's a problem.";
	}

}
