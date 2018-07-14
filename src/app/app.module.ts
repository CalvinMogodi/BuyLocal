import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app.routing';
import { RouterModule, provideRoutes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy} from '@angular/common'
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';
import { ProductComponent } from './product/product.component';
import { StoreComponent } from './store/store.component';
import { CommonService } from './shared/common';
import { CheckoutComponent } from './checkout/checkout.component';

import { UserProvider } from './providers/user'; 
import { StoreProvider } from './providers/store'; 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,    
    LoginComponent,
    RegisterComponent,
    NavComponent,
    FooterComponent,
    ProductComponent,
    StoreComponent,
    CheckoutComponent
  ],
 exports: [RouterModule],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    FormsModule,
     HttpModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    CommonService,
    UserProvider,
    StoreProvider,
    HttpClient,
    {provide:LocationStrategy, useClass:HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
