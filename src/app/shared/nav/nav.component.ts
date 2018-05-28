import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from '../../shared/common';

declare const $: any;
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(public router: Router, public commonService: CommonService) { }

  ngOnInit() {
  }

  Navigate(gategory, product) {
    this.commonService.assginProductSearch({gategory: gategory, product: product,});
    this.router.navigate(['/product']);
  }
  NavigateTo(url) {
    this.router.navigate([url]);
  }

  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };

  /*logout(url) {
    this.userService.signOut().then(authData => {
       sessionStorage.setItem('currentUser', JSON.stringify(null));
       this.router.navigate([url]);
    });
  }*/

}
