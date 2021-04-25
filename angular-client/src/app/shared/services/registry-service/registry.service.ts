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

  public getFiscalCodeRegex() : string {
    return '[A-Za-z]{6}[0-9]{2}[A-Za-z]{1}[0-9]{2}[A-Za-z]{1}[0-9]{3}[A-Za-z]{1}';
  }


  public findAll(): Observable<Registry[]> {
    return this.httpClient.get<Registry[]>(this.apiUrl);
  }

  public saveUser(name: String, surname: String, fiscalCode: String, birthday: Date, email: String): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.apiUrl, {
      name: name,
      surname: surname,
      fiscalCode: fiscalCode,
      birthday: birthday,
      email: email
    });
  }
}
