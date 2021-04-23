import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registry } from '../../models/registry-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../models/api-response-model';
 
@Injectable({
  providedIn: 'root'
})
export class RegistryService {
  apiUrl: string = `${environment.apiUrl}/registry`;

  constructor(private httpClient: HttpClient) { }


  public findAll(): Observable<Registry[]> {
    return this.httpClient.get<Registry[]>(this.apiUrl);
  }

  public saveUser(name: String, surname: String, birthday: Date, email: String): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.apiUrl, {
      name: name,
      surname: surname,
      birthday: birthday,
      email: email
    });
  }
}
