import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl = environment.api

  constructor(private http: HttpClient) { }

  register(user: any) {
    return this.http.post(`${this.apiUrl}/users/create`, user)
  }

  validEmail(email: string){
    return this.http.get(`${this.apiUrl}/users/email`, {params: {email: email}})
  }

  login(user: any){
    return this.http.post(`${this.apiUrl}/users/login`, user)
  }

  changeEmail(email:string) {
    return this.http.post(`${this.apiUrl}/users/emailchange`, {newEmail: email})
  }
}
