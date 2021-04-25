import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../models/api-response-model';
import { Appointments } from '../../models/appointments-model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {

  apiUrl: string = `${environment.apiUrl}/appointments`;

  constructor(private httpClient: HttpClient) { }

  public findAll(): Observable<Appointments[]> {
    return this.httpClient.get<Appointments[]>(this.apiUrl);
  }

  save(fiscalCode: string, date: Date, interval: string): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.apiUrl, {
      fiscalCode: fiscalCode,
      date: date,
      interval: interval
    });
  }
}
