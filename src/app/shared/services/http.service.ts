import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

/* handles GET & POST requests to backend
*/

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private http: HttpClient
    ) { }

    // add JWT to the header of all backend requests
    jwtHeader() {
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Authorization', 'Bearer ' + localStorage.getItem('jwt'));
        return headers;
    }

    // get card/loan type data from backend
    getAll(url: any) {
        return this.http.get(url, {
            headers: this.jwtHeader()
        });
    }

    // submit card/loan application form
    postForm(url: any, fields: any) {
        let myHeaders: HttpHeaders = this.jwtHeader();
        myHeaders = myHeaders.append('Content-Type', 'application/json');
        return this.http.post(
            url,
            JSON.stringify(fields),
            {
                headers: myHeaders,
                responseType: 'text',
                observe: 'response'
            }
        );
    }

}
