import { Component } from '@angular/core';
import { ProductProvider } from '../providers/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'app';
  public products = [];
  public productToView = {
    Name: '',
    Description: '',
    Price: '',
    IsOnSpecial: 'false',
    Discount: '',
    ImageName: '',
    StoreId: 0,
    CreatedDate: '',
    Id: 0,
  };
  public serverImgurl = "http://localhost:7777/";
  public currentUser: any;
  constructor(public productProvider: ProductProvider) {
    this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    this.productProvider.getSpecialDeals().subscribe((response: any) => {
      this.products = response;
    });
  }

  setProductToView(product) {
    this.productToView = product;
    //sessionStorage.setItem('productToView', JSON.stringify(product));
  }
}

