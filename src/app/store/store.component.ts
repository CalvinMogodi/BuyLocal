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
  public currentUser: any;
  public storeForm: FormGroup;
  public productForm: FormGroup;
  public submitStoreAttempt: boolean = false;
  public submitProductAttempt: boolean = false;
  public showStoreError: boolean = false;
  public storeError = '';
  public showProductError: boolean = false;
  public productError = '';
  public storeHeader = 'Add Store';
  public productHeader = 'Add Product';
  public stores = [];
  public store = {
    name: '',   
    description: '',
    userId: 0,
    createdDate: '',
  };
  public product = {
    name: '',   
    description: '',
    price: 0.00,
    isOnSpecial: false,
    discount: 0.00,
    imageName: '',
    storeId: '',
    createdDate: '',
  };
  constructor(public formBuilder: FormBuilder, public storeProvider: StoreProvider, public router: Router) {
     this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
      this.storeForm = formBuilder.group({
      name: [this.store.name, Validators.compose([Validators.required])],
      description: [this.store.description, Validators.compose([Validators.required])]
    });

    this.productForm = formBuilder.group({
      name: [this.product.name, Validators.compose([Validators.required])],
      description: [this.product.description, Validators.compose([Validators.required])],
      price: [this.product.price, Validators.compose([Validators.required])],
      discount: [this.product.discount],
    });

     this.storeProvider.getStoreByUserId({userId: this.currentUser.Id}).subscribe((response: any) => {
        this.stores = response;
     });
  }

  addStore(){
    this.submitStoreAttempt = true;
    this.showStoreError = false;
    this.storeError = '';

    if (this.storeForm.valid) {
      this.store.userId = this.currentUser.Id;
      this.store.createdDate = new Date().toString();
       this.storeProvider.addStore(this.store).subscribe((response: any) => {
        if (response.result && response.errorMessage == null) {
          let element: HTMLElement = document.getElementById('closeStoreModal') as HTMLElement;
          element.click(); 
          this.clear();
        }else if(response.errorMessage != null){
          this.showStoreError = true;
          this.storeError = response.errorMessage;
        }else{
          this.showStoreError = true;
          this.storeError = 'We are unable to add your store right now, Please try again later.';
        }
       })
    }
  }

   updateStore(){
    this.submitStoreAttempt = true;
    this.showStoreError = false;
    this.storeError = '';
  }

  addProduct(){
    this.submitProductAttempt = true;
    this.showProductError = false;
    this.productError = '';
    if (this.productForm.valid) {
       this.storeProvider.addProduct(this.product).subscribe((response: any) => {
        if (response.result && response.errorMessage == null) {
          let element: HTMLElement = document.getElementById('closeProductModal') as HTMLElement;
          element.click();
          this.clear();
        }else if(response.errorMessage != null){
          this.showProductError = true;
          this.productError = response.errorMessage;
        }else{
          this.showProductError = true;
          this.productError = 'We are unable to add your product right now, Please try again later.';
        }
       })
    }    
  }

   updateProduct(){
    this.submitProductAttempt = true;
    this.showProductError = false;
    this.productError = '';
  }

  clear(){
    this.submitStoreAttempt = false;
    this.submitProductAttempt = false;
    this.showStoreError = false;
    this.storeError = '';
    this.showProductError = false;
    this.productError = '';
    this.storeHeader = 'Add Store';
    this.productHeader = 'Add Product';
    this.store = {
      name: '',   
      description: '',
      userId: 0,
      createdDate: '',
    };
    this.product = {
      name: '',   
      description: '',
      price: 0.00,
      isOnSpecial: false,
      discount: 0.00,
      imageName: '',
      storeId: '',
      createdDate: '',
    };
  }
  
}