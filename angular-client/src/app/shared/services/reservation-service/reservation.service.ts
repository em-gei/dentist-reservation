import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { ApiResponse } from '../../models/api-response-model';
import { Timetables } from '../../models/timetables-model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  timetablesApiUrl: string = `${environment.apiUrl}/timetables`;
  timetables: string[];

  constructor(private httpClient: HttpClient) { 
  }

  getTimetables(): Observable<Timetables[]> {
   return this.httpClient.get<Timetables[]>(this.timetablesApiUrl);
  }
}
