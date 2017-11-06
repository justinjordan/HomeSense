import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-new-device',
  templateUrl: './new-device.component.html',
  styleUrls: ['./new-device.component.css']
})
export class NewDeviceComponent implements OnInit {

	// locateFormGroup: FormGroup;
	// sshFormGroup: FormGroup;
	// configFormGroup: FormGroup;

	constructor(public dialogRef: MatDialogRef<NewDeviceComponent>) { }

	ngOnInit()
	{
	}

	locate()
	{

	}

}
