import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly ACCESS_TOKEN = 'accessToken';

  constructor() { }

  setToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN, token)
  }

  getToken() {
    return localStorage.getItem(this.ACCESS_TOKEN)
  }

  deleteToken() {
    localStorage.removeItem(this.ACCESS_TOKEN)
  }
}
