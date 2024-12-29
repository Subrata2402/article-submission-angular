import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry } from 'rxjs';
import { GET_API } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class JournalService {

  constructor(private http: HttpClient) { }

  getJournalList(): Observable<any> {
    return this.http.get(GET_API.getJournalList).pipe(retry(2), catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return new Observable<never>();
  }
}