import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitAttempt: boolean = false;
  showError: boolean = false;
  tncCheck: boolean = false;
  public user = {
    email: '',
    firstName: '',
    surname: '',
    password: '',
    isSupplier: false,
  }

  constructor(public formBuilder: FormBuilder) {
    this.registerForm = formBuilder.group({
      firstName: [this.user.firstName, Validators.compose([Validators.required])],
      surname: [this.user.surname, Validators.compose([Validators.required])],
      isSupplier: [this.user.isSupplier, Validators.compose([Validators.required])],
      password: [this.user.password, Validators.compose([Validators.required])],
      email: [this.user.email, Validators.compose([Validators.required])],
    });
  }

  Register() {
    this.submitAttempt = true;
    this.showError = false;
    if (this.registerForm.valid) {
    }
  }
 
}