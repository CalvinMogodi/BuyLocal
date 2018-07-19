import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.css']
})
export class SingleComponent {
  title = 'app';
  public serverImgurl = "http://localhost:7777/";
  public product: any;

  constructor(public router: Router) {
    this.product = JSON.parse(sessionStorage.getItem('productToView'));
  }
}