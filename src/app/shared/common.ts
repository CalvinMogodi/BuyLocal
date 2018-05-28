import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class CommonService {
    public user: any;
    public productSearch: any;

    constructor() {
    } 

    assginUser(user: {}): any {
        this.user = user;
    }

    getUser(): any {
        return this.user;
    }

    assginProductSearch(productSearch: {}): any {
        this.productSearch = productSearch;
    }

    getProductSearch(): any {
        return this.productSearch;
    }
}