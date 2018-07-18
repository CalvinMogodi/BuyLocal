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
  public serverImgurl = '';
  public selectedStore = {
    Name: '',
    Description: '',
    UserId: 0,
    CreatedDate: '',
    Id: 0,
    index: -1
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
    id: 0
  };
  public product = {
    name: '',
    description: '',
    price: '',
    isOnSpecial: false,
    discount: '',
    imageName: '',
    storeId: 0,
    createdDate: '',
    id: 0,
  };
  public selectedProduct = {
    Name: '',
    Description: '',
    Price: '',
    IsOnSpecial: 'false',
    Discount: '',
    ImageName: '',
    StoreId: 0,
    CreatedDate: '',
    Id: 0,
    index: -1
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
    this.serverImgurl = '';
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      let reader = new FileReader();
      var thisThis = this;
      reader.readAsDataURL(file);
      reader.onload = (function (file) {
        thisThis.base64Image = reader.result;
      });
      reader.readAsText(file);
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
          this.storeProvider.getStoreByUserId({ userId: this.currentUser.Id }).subscribe((response: any) => {
            this.stores = response;
          });
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

  setStore(store, index) {
    this.storeHeader = 'Add Store';
    if (store != undefined) {
      this.selectedStore = store;
      this.selectedStore.index = index;
      this.store.name = store.Name;
      this.store.description = store.Description;
      this.store.id = store.Id;
      this.storeHeader = 'Edit Store';
    }
    else {
      this.selectedStore = {
        Name: '',
        Description: '',
        UserId: 0,
        CreatedDate: '',
        Id: 0,
        index: -1
      };
      this.store = {
        name: '',
        description: '',
        userId: 0,
        createdDate: '',
        id: 0
      };
    }

  }

  setProduct(product, index) {
    this.serverImgurl = '';
    this.productHeader = 'Add Product';
    this.base64Image = this.storeProvider.getNoImageBase64();
    if (product != undefined) {
      this.serverImgurl = "http://localhost:7777/" + product.ImageName;
      this.selectedProduct = product;
      this.selectedProduct.index = index;
      this.product.name = product.Name;
      this.product.description = product.Description;
      this.product.price = product.Price;
      if (product.IsOnSpecial == 1)
        this.product.isOnSpecial = true;
      else
        this.product.isOnSpecial = false;
      this.product.discount = product.Discount;
      this.product.id = product.Id;
      this.product.imageName = product.ImageName;
      this.productHeader = 'Edit Product';
    }
    else {
      this.product = {
        name: '',
        description: '',
        price: '',
        isOnSpecial: false,
        discount: '',
        imageName: '',
        storeId: 0,
        createdDate: '',
        id: 0,
      };
      this.selectedProduct = {
        Id: 0,
        Name: '',
        Description: '',
        Price: '',
        IsOnSpecial: '',
        Discount: '',
        ImageName: '',
        StoreId: 0,
        CreatedDate: '',
        index: -1
      }
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
    this.storeProvider.deleteProduct({ id: this.selectedProduct.Id }).subscribe((response: any) => {
      this.products.splice(this.selectedProduct.index, 1);
    });
  }

  updateStore() {
    this.submitStoreAttempt = true;
    this.showStoreError = false;
    this.storeError = '';

    if (this.store.name != '' && this.store.description != '') {
      this.store.userId = this.currentUser.Id;
      this.store.createdDate = new Date().toString();
      this.storeProvider.updateStore(this.store).subscribe((response: any) => {
        if (response.result && response.errorMessage == null) {
          let element: HTMLElement = document.getElementById('closeStoreModal') as HTMLElement;
          element.click();
          this.storeProvider.getStoreByUserId({ userId: this.currentUser.Id }).subscribe((response: any) => {
            this.stores = response;
          });
          this.clear();
        } else if (response.errorMessage != null) {
          this.showStoreError = true;
          this.storeError = response.errorMessage;
        } else {
          this.showStoreError = true;
          this.storeError = 'We are unable to update your store right now, Please try again later.';
        }
      })
    }
  }

  addProduct() {
    this.submitProductAttempt = true;
    this.showProductError = false;
    this.productError = '';
    if (this.productForm.valid) {
      if (this.product.isOnSpecial) {
        if (this.product.discount >= this.product.price)
          return false;
      }
      this.storeProvider.productisDuplicate({ storeId: this.selectedStore.Id, name: this.product.name }).subscribe((response: any) => {
        if (!response.result) {
          this.storeProvider.uploadProductImage(this.base64Image).subscribe((response: any) => {
            this.product.imageName = response;
            this.product.createdDate = new Date().toString();
            this.product.storeId = this.selectedStore.Id;
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
    if (this.product.name != '' && this.product.description != '' && this.product.price != '') {
      if (this.product.isOnSpecial) {
        if (this.product.discount >= this.product.price)
          return false;
      }
      this.product.createdDate = new Date().toString();
      if (this.serverImgurl == '') {
        this.storeProvider.uploadProductImage(this.base64Image).subscribe((response: any) => {
          this.product.imageName = response;
          this.storeProvider.updateProduct(this.product).subscribe((response: any) => {
            if (response.result && response.errorMessage == null) {
              let element: HTMLElement = document.getElementById('closeProductModal') as HTMLElement;
              element.click();
              this.clear();
              this.viewStoreProducts(this.selectedStore)
            } else {
              this.showProductError = true;
              this.productError = 'We are unable to update your product right now, Please try again later.';
            }
          })
        })
      } else {
        this.storeProvider.updateProduct(this.product).subscribe((response: any) => {
          if (response.result && response.errorMessage == null) {
            let element: HTMLElement = document.getElementById('closeProductModal') as HTMLElement;
            element.click();
            this.clear();
            this.viewStoreProducts(this.selectedStore)
          } else {
            this.showProductError = true;
            this.productError = 'We are unable to update your product right now, Please try again later.';
          }
        })
      }
    }
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
      id: 0
    };
    this.product = {
      name: '',
      description: '',
      price: '',
      isOnSpecial: false,
      discount: '',
      imageName: '',
      storeId: 0,
      createdDate: '',
      id: 0,
    };
  }

}