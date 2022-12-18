// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent {


@Input() loginData = { Username: '', Password: ''};//Decorator

constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef< UserLoginFormComponent >,
    public snackBar: MatSnackBar) { }

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
loginUser(): void {
  this.fetchApiData.userLogin(this.loginData).subscribe((response) => {
    //Success response
   this.dialogRef.close(); // Close dialog on success
   console.log('loginUser() response1:', response);
   this.snackBar.open('Login successfully!', 'OK', {
      duration: 2000
   });
  }, (response) => {
    //Error response
    console.log('loginUser() response2:', response);
    this.snackBar.open(response.message, 'OK', {
      duration: 4000
    });
  });
}
}