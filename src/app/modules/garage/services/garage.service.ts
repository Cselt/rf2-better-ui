import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Setup } from '../interfaces/setup';

@Injectable()
export class GarageService {
  constructor(private http: HttpClient) {}

  public loadSetups(): Observable<Setup[]> {
    return this.http.get<Setup[]>('/rest/garage/setup');
  }

  public loadSavedSetup(name: string): Observable<void> {
    return this.http.put<void>('/rest/garage/setup', name);
  }

  public loadSetupSummary(): Observable<any> {
    return this.http.get<any>('/rest/garage/summary');
  }

  public compare(name: string): Observable<void> {
    return this.http.post<void>('/rest/garage/setup/compare', name);
  }

  public loadNotes(name: string): Observable<string> {
    if (!name || name === '') {
      return of('');
    }
    return this.http
      .get(`/rest/garage/setup/notes/${encodeURI(name)}`, { responseType: 'text' })
      .pipe(map((message: string) => message.replace(/(ÿ)/gm, '\n').replace(/['"]+/g, '').replace('NOTES=', '')));
  }

  public saveNotes(notes: string): Observable<void> {
    return this.http.post<void>('/rest/garage/setup/notes', notes);
  }

  public loadShowingOnlyRelevant(): Observable<boolean> {
    return this.http.get<boolean>('/rest/garage/showOnlyRelevantSetups');
  }

  public changeShowingOnlyRelevant(showOnlyRelevant: boolean): Observable<void> {
    return this.http.post<void>('/rest/garage/showOnlyRelevantSetups', showOnlyRelevant);
  }

  public deleteSetup(name: string): Observable<void> {
    return this.http.delete<void>(`/rest/garage/setup/${encodeURI(name)}`);
  }

  public compareSetup(name: string): Observable<void> {
    return this.http.post<void>(`/rest/garage/setup/compare`, name);
  }

  public setDefault(name: string): Observable<void> {
    return this.http.post<void>('/rest/garage/setup/default', name);
  }

  public loadCurrentTrackFolder(): Observable<string> {
    return this.http.get('/rest/garage/currentTrackFolder', { responseType: 'text' });
  }
}
