import { Component, OnInit } from '@angular/core';
import {
  FormGroupDirective,
  NgForm,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiResponse } from 'src/app/shared/models/api-response-model';
import { RegistryService } from 'src/app/shared/services/registry-service/registry.service';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  public userForm: FormGroup;
  nameFormControl: FormControl;
  surnameFormControl: FormControl;
  birthdayFormControl: FormControl;
  emailFormControl: FormControl;
  maxDate: Date;
  matcher = new MyErrorStateMatcher();
  HTTP_CREATED: number = 201;

  constructor(
    private registryService: RegistryService,
    private snackBar: MatSnackBar
  ) {
    this.nameFormControl = new FormControl('', Validators.required);
    this.surnameFormControl = new FormControl('', Validators.required);
    this.birthdayFormControl = new FormControl('', Validators.required);
    this.emailFormControl = new FormControl('', [
      Validators.required,
      Validators.email,
    ]);
    this.userForm = new FormGroup({
      nameFormControl: this.nameFormControl,
      surnameFormControl: this.surnameFormControl,
      birthdayFormControl: this.birthdayFormControl,
      emailFormControl: this.emailFormControl,
    });

    // Add validation on max date for birthday field
    let today = new Date();
    this.maxDate = new Date(
      today.getFullYear() - 18,
      today.getMonth() + 1,
      today.getDate()
    );
  }

  ngOnInit(): void {}

  saveUser(): void {
    if (this.userForm.valid) {
      this.registryService
        .saveUser(
          this.nameFormControl.value,
          this.surnameFormControl.value,
          this.birthdayFormControl.value,
          this.emailFormControl.value
        )
        .subscribe(
          (res: ApiResponse) => {
            if (res.status == this.HTTP_CREATED) {
              // User succesfully created
              this.userForm.reset();
              Object.keys(this.userForm.controls).forEach(key => {
                this.userForm.get(key).setErrors(null);
              });
              this.userForm.updateValueAndValidity();
              this.showSnackbar(res.message, 'snackbar_success');
            } else {
              // User not created depending on some problems
              this.showSnackbar(res.status +': ' + res.message, 'snackbar_error');
            }
          },
          (err: Object) => {
            // Manage creation error
            let error : ApiResponse = err['error'];
            this.showSnackbar(error.status +': ' + error.message, 'snackbar_error');
          }
        );
    }
  }

  /**
   * Shows a bottom snackbar to communicate informations to user
   * @param message - message to be displayed
   * @param style - style for the snackbak, success or error
   */
  showSnackbar(message: string, style: string) {
    this.snackBar.open(message, 'Ok', {
      duration: 3000,
      panelClass: [style],
    });
  }
}
