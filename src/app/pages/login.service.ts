import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IUser } from '../shared/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  signInFormErrorSubject = new Subject<number>();
  signInFormError$ = this.signInFormErrorSubject.asObservable();

  signInFormSuccessSubject = new Subject<Object>();
  signInFormSuccess$ = this.signInFormSuccessSubject.asObservable();

  signIn(user: IUser) {
    this.httpClient.post<Object>('/api/auth/local/login', user)
    .subscribe({
      next: (token) => this.signInFormSuccessSubject.next(token),
      error: (httpError: HttpErrorResponse) => this.signInFormErrorSubject.next(httpError.status)
    });
  }
}
