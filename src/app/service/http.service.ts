import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
    private baseUrl = 'http://localhost:8080/';
    private apiPrefixUri = "api/";

    private prefixUri = `${this.baseUrl}${this.apiPrefixUri}`;

    constructor(
        private httpClient: HttpClient,
    ) {}

    callServer(url: string, method: HttpMethods, ...params: any): Observable<any> {
        const serverUrl = `${this.prefixUri}${url}`;
        if(method == HttpMethods.GET) {
            return this.httpClient.get(url, {params: params});
        } else if (method == HttpMethods.POST) {
            return this.httpClient.post(url, params);
        }

        throw new Error(`Invalid http method: ${method}`);
    }
}

export enum HttpMethods {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
    PATCH = "PATCH"
}
