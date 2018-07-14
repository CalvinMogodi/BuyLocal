import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { StoreProvider } from '../providers/store';  

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent {
  public currentUser = {};
  public storeForm: FormGroup;
  public submitAttempt: boolean = false;
  public showStoreError: boolean = false;
  public storeError = '';
  public storeHeader = 'Add Store';
  public store = {
    name: '',   
    description: '',
  }
  constructor(public formBuilder: FormBuilder, public storeProvider: StoreProvider, public router: Router) {
     this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.storeForm = formBuilder.group({
      name: [this.store.name, Validators.compose([Validators.required])],
      description: [this.store.description, Validators.compose([Validators.required])]
    });
  }

  addStore(){

  }
  
}