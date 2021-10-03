import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Setup } from '../interfaces/setup';

@Injectable()
export class GarageService {

  constructor(private http: HttpClient) {
  }

  public loadSetups(): Observable<Setup[]> {
    return this.http.get<Setup[]>('/rest/garage/setup');
  }
}
