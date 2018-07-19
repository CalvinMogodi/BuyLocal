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
  public showlogout: boolean = false;
  public activeMenuTab: number = 0;

  constructor(public router: Router, public commonService: CommonService) {
    router.events.subscribe((url:any) => { 
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (currentUser == null) {
      this.showlogout = false;
    } else {
      this.showlogout = true;
    }
    switch(url.url){
      case "/" : {
        this.activeMenuTab = 0;
        break;
      }
      case "/store" :  {
        this.activeMenuTab = 1;
        break;
      }
      case "/product" :  {
        this.activeMenuTab = 2;
        break;
      }
    }
  });
  }

  ngOnInit() {
  }

  Navigate(gategory, product) {
    this.commonService.assginProductSearch({ gategory: gategory, product: product, });
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

  logout() {
    sessionStorage.setItem('currentUser', JSON.stringify(null));
    this.showlogout = false;
    this.router.navigate(['home']);
  }

}
