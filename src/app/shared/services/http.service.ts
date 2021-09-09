import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

    getAll(url: any) {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

        // console.log("Attemping to send jwt...");

        return this.http.get(url, {
            headers: headers
        });
    }

}
