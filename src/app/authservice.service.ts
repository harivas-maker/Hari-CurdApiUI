import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthserviceService {
   private apiUrl = 'https://localhost:44316/api';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
  return this.http.post(`${this.apiUrl}/Users/Login`, { email, password }).pipe(
    tap((res: any) => {
      localStorage.setItem('token', res.token);
    })
  );
}


  logout() {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
