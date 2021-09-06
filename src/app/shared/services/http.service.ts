import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(private http: HttpClient) { }

    getAll(url: any) {
        return this.http.get(url);
    }

    deleteById(url: any) {
        return this.http.delete(url);
    }
}
