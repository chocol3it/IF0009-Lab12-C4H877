import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Charla } from '../models/charla.model';

@Injectable({ providedIn: 'root' })
export class CharlaService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/charlas';

  listar(): Observable<Charla[]> {
    return this.http.get<Charla[]>(this.apiUrl);
  }

  crear(charla: Charla): Observable<Charla> {
    return this.http.post<Charla>(this.apiUrl, charla);
  }
}
