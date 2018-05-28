import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { StoreComponent } from './store/store.component';
import { CheckoutComponent } from './checkout/checkout.component';

const routes: Routes =[
    { path: 'home', component: HomeComponent },  
    { path: 'product', component: ProductComponent },  
    { path: 'store', component: StoreComponent }, 
    { path: 'store', component: StoreComponent }, 
     { path: 'checkout', component: CheckoutComponent }, 
    { path: '',redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
