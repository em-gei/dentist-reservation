import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Registry } from '../../models/registry-model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class RegistryService {

  constructor(private httpClient: HttpClient) { }


  public findAll(): Observable<Registry[]> {
    return this.httpClient.get<Registry[]>(`${environment.apiUrl}/registry`);
  }
}
