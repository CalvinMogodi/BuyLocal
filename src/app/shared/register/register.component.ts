import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserProvider } from '../../providers/user'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitAttempt: boolean = false;
  showError: boolean = false;
  errorMessage: string = '';
  confirmPassword = '';
  tncCheck: boolean = false;
  public user = {
    username: '',
    name: '',
    surname: '',
    password: '',
    isSupplier: false,
    userType: 'User'
  }

  constructor(public formBuilder: FormBuilder, public userProvider: UserProvider, public router: Router) {
    this.registerForm = formBuilder.group({
      name: [this.user.name, Validators.compose([Validators.required])],
      surname: [this.user.surname, Validators.compose([Validators.required])],
      isSupplier: [this.user.isSupplier, Validators.compose([Validators.required])],
      password: [this.user.password, Validators.compose([Validators.required])],
      username: [this.user.username, Validators.compose([Validators.required])],
      confirmPassword: [this.confirmPassword]      
    });
  }

  Register() {
    this.submitAttempt = true;
    this.showError = false;
    this.errorMessage = '';
    if(this.user.password != this.confirmPassword)
      return false;

    if (this.registerForm.valid) {
      if(this.user.isSupplier)
        this.user.userType = 'Supplier';
      this.userProvider.createUser({Username: this.user.username,Name: this.user.name,Surname: this.user.surname,
                                  Password: this.user.password,UserType: this.user.userType}).subscribe((response: any) => {
        if (response.result && response.errorMessage == null) {
           this.router.navigate(['store']);
        }else if(response.errorMessage != null){
          this.showError = true;
          this.errorMessage = response.errorMessage;
        }else{
          this.showError = true;
          this.errorMessage = 'We are unable to register right now, Please try again later.';
        }
      });
    }
  }
 
}