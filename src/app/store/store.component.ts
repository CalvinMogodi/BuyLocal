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
  public base64Image = '';
  public selectedStore = {
    Name: '',
    Description: '',
    UserId: 0,
    CreatedDate: '',
    Id: 0
  };
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
  public showProducts: boolean = false;
  public stores = [];
  public products = [];
  public store = {
    name: '',
    description: '',
    userId: 0,
    createdDate: '',
  };
  public product = {
    name: '',
    description: '',
    price: '',
    isOnSpecial: 'false',
    discount: '',
    imageName: '',
    storeId: 0,
    createdDate: '',
  };
  public selectedProduct = {
    name: '',
    description: '',
    price: '',
    isOnSpecial: 'false',
    discount: '',
    imageName: '',
    storeId: 0,
    createdDate: '',
  }
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
      isOnSpecial: [this.product.isOnSpecial]
    });

    this.storeProvider.getStoreByUserId({ userId: this.currentUser.Id }).subscribe((response: any) => {
      this.stores = response;
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      this.base64Image = reader.result;
    }
  }

  addStore() {
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
        } else if (response.errorMessage != null) {
          this.showStoreError = true;
          this.storeError = response.errorMessage;
        } else {
          this.showStoreError = true;
          this.storeError = 'We are unable to add your store right now, Please try again later.';
        }
      })
    }
  }

  setStore(store) {
    if (store != undefined)
      this.selectedStore = store;
    else
      this.selectedStore = {
        Name: '',
        Description: '',
        UserId: 0,
        CreatedDate: '',
        Id: 0
      };
  }

  setProduct(product) {
    this.base64Image = this.storeProvider.getNoImageBase64();
    if (product != undefined)
      this.selectedProduct = product;
    else
      this.selectedProduct = {
        name: '',
        description: '',
        price: '',
        isOnSpecial: '',
        discount: '',
        imageName: '',
        storeId: 0,
        createdDate: '',
      }
  }

  viewStoreProducts(store) {
    this.products = [];
    this.showProducts = true;
    this.selectedStore = store;

    this.storeProvider.getProductsStoreById({ storeId: store.Id }).subscribe((response: any) => {
      this.products = response;
    });
  }

  deleteProduct() {

  }

  updateStore() {
    this.submitStoreAttempt = true;
    this.showStoreError = false;
    this.storeError = '';
  }

  addProduct() {
    this.submitProductAttempt = true;
    this.showProductError = false;
    this.productError = '';
    if (this.productForm.valid) {
      this.storeProvider.productisDuplicate({ storeId: this.selectedStore.Id, name: this.product.name }).subscribe((response: any) => {
        if (!response.result) {
          this.storeProvider.uploadProductImage(this.base64Image).subscribe((response: any) => {
            this.product.imageName = response;
            this.product.createdDate = new Date().toString();
            this.product.storeId = this.selectedStore.Id;
           
            if(this.product.isOnSpecial == 'on')
                this.product.isOnSpecial = 'true';
            else
                this.product.isOnSpecial = 'false';
            this.storeProvider.addProduct(this.product).subscribe((response: any) => {
              if (response.result && response.errorMessage == null) {
                let element: HTMLElement = document.getElementById('closeProductModal') as HTMLElement;
                element.click();
                this.clear();
                this.viewStoreProducts(this.selectedStore)
              } else {
                this.showProductError = true;
                this.productError = 'We are unable to add your product right now, Please try again later.';
              }
            })
          })
        } else {
          this.productError = 'Product already exists.';
          this.showProductError = true;
        }
      });

    }
  }

  updateProduct() {
    this.submitProductAttempt = true;
    this.showProductError = false;
    this.productError = '';
  }

  clear() {
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
      price: '',
      isOnSpecial: 'false',
      discount: '',
      imageName: '',
      storeId: 0,
      createdDate: '',
    };
  }

}