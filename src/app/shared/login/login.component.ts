import { Component } from '@angular/core';
import { UserProvider } from '../../providers/user'; 
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public loginForm: FormGroup;
  public submitAttempt: boolean = false;
  public showError: boolean = false;
  public user = {
    username: '',   
    password: '',
  }

  constructor(public formBuilder: FormBuilder, public userProvider: UserProvider, public router: Router) {
    this.loginForm = formBuilder.group({
      password: [this.user.password, Validators.compose([Validators.required])],
      username: [this.user.username, Validators.compose([Validators.required])]
    });
  }

   login() {
    this.submitAttempt = true;
    this.showError = false;

    if (this.loginForm.valid) {
       this.userProvider.loginUser({Username: this.user.username,Password: this.user.password}).subscribe((response: any) => {
        if (response.result) {
          let element: HTMLElement = document.getElementById('closeModal') as HTMLElement;
          element.click();
          sessionStorage.setItem('currentUser', JSON.stringify(response.data));
          if(response.data.UserType == 'Supplier'){ 
            this.router.navigate(['store']);            
          }else{
            this.router.navigate(['product']);  
          }
        }else{
          this.showError = true;
        }
      });
    }
   }
}