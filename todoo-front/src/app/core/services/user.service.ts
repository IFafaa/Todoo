import { TokenService } from './token.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private tokenService: TokenService) { }

  getUser(): any {
    return JSON.parse(atob(this.tokenService.getToken()!.split('.')[1]));
  }
}
