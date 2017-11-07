import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

	@ViewChild('stepper') stepper;

	serverError: string;

	locateRunning: boolean = false;
	locateCompleted: boolean = false;
	locateGroup: FormGroup;

	deviceData: {ip: string, user: string, pass: string} = {ip: '', user: '', pass: ''};

	constructor(public dialogRef: MatDialogRef<NewDeviceComponent>, private _formBuilder: FormBuilder) { }

	ngOnInit()
	{
		this.locateGroup = this._formBuilder.group({
			ipCtrl: ['', [Validators.required, Validators.pattern('^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$')]]
		});
	}

	locate()
	{
		if (!this.locateGroup.valid)
			{ return; }

		this.locateRunning = true;
		var ip = this.deviceData.ip;

		try
		{
			if (typeof ip === 'undefined' || ip === '')
				{ throw new Error("IP Address wasn't provided."); }
			if (!ip.match(/^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$/))
				{ throw new Error("IP Address is invalid."); }

			// Run IP Search
			// throw new Error("IP not in network.");

			this.deviceData.ip = ip;

			// Spoof success for testing
			setTimeout(() => {
				this.stepper.next();
				setTimeout(() => {
					this.locateRunning = false;
				}, 500);
			}, 3000);
		}
		catch (e)
		{
			this.locateRunning = false;
			this.deviceData.ip = '';
			this.serverError = e.message;
			return;
		}
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
