import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class StoreProvider {
    public url: string = "http://localhost:7777/api";

    constructor(public http: HttpClient) {
        
    }

    addStore(parameters) {
        return this.http.post(this.url + "/addStore", parameters);
    }

    addProduct(parameters) {
        return this.http.post(this.url + "/addProduct", parameters);
    }

    updateStore(parameters) {
        return this.http.post(this.url + "/updateStore", parameters);
    }

    updateProduct(parameters) {
        return this.http.post(this.url + "/updateProduct", parameters);
    }

    deleteProduct(parameters) {
        return this.http.post(this.url + "/deleteProduct", parameters);
    }

    uploadProductImage(parameters) {
        return this.http.post(this.url + "/uploadProductImage", parameters);
    }    

    getStoreByUserId(parameters) {
        return this.http.post(this.url + "/getStoreByUserId", parameters);
    }

    getProductsStoreById(parameters) {
        return this.http.post(this.url + "/getProductsStoreById", parameters);
    }
}