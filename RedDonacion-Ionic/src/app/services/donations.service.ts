import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DonationsService {
    private readonly API_URL = "http://localhost:8005/api/v1/donations";

    constructor(private http: HttpClient) { }

    public getAll(): Observable<any> {
        return this.http.get<any>(this.API_URL);
    }

    public getById(id: string): Observable<any> {
        return this.http.get<any>(this.API_URL + "/" + id);
    }
}