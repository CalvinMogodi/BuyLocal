import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserProvider {
    public url: string = "http://localhost:7777/api";

    constructor(public http: HttpClient) {
        
    }

    getUserById(parameters) {
        return this.http.post(this.url + "/getUserById", parameters);
    }

    loginUser(parameters) {
        return this.http.post(this.url + "/loginUser", parameters);
    }

    createUser(parameters) {
        return this.http.post(this.url + "/createUser", parameters);
    }
}