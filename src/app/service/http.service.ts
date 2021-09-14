import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  private baseURL: string = "http://localhost:8080/addressbook";

  constructor(private httpClient: HttpClient) {}

    getPersonData(): Observable<any> {
      return this.httpClient.get(this.baseURL + "/get");
    }  

    deletePersonData(id: number): Observable<any>{
      return this.httpClient.delete(this.baseURL + "/delete/" + id)
    }
    
    addPersonData(body: any): Observable<any> {
      return this.httpClient.post(this.baseURL + "/create", body);
    }

    updatePersonData(id: number, body: any): Observable<any> {
      return this.httpClient.put(this.baseURL + "/update/" + id, body);
    }

    getAddressBookDetailsByID(id: number): Observable<any> {
      return this.httpClient.get(this.baseURL + "/personId/",
        {
          headers: new HttpHeaders(),
          params: new HttpParams().append('personId', id)
        })
    }

    getStateDetails(): Observable<any> {
      return this.httpClient.get(this.baseURL + "/getStateDetails");
    }
}