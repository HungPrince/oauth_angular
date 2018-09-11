import { KEYNAMELOCALSTORAGE } from './../../constants/constant';
import { LocalStorageService } from './../../helpers/localStorage.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/observable';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import * as moment from 'moment';

import { APIURL } from './../../constants/config';
import { User } from './../../models/user';

const headers = new HttpHeaders().set("Content-Type", "application/x-www-form-urlencoded");
headers.append("accept", "application/json");

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient, private localStorageService: LocalStorageService) {
  }

  login(user: User): Observable<any> {
    let data = this.convertDataBody(user);
    const url = APIURL + 'account/login';
    let dataUser: any;
    return this.httpClient.post(url, data, { headers: headers });
  }

  register(user: User): Observable<any> {
    let data = this.convertDataBody(user);
    const url = APIURL + 'account/register';
    return this.httpClient.post(url, data, { headers: headers });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(KEYNAMELOCALSTORAGE.CURRENT_USER) ? true : false;
  }

  getToken(user: User): Observable<any> {
    const url = 'http://localhost:55257/token';
    let body = {
      "UserName": user.UserName,
      "Password": user.Password,
      "grant_type": "password"
    }
    let data = this.convertDataBody(body);
    return this.httpClient.post(url, body, { headers: headers });
  }

  private convertDataBody(data) {
    return JSON.stringify(data).replace("{", '').replace("}", '').replace(/"/g, '').replace(/,/g, "&").replace(/:/g, '=');
  }

  getExpiration() {
    const token = this.decodeToken(localStorage.getItem('TokenID'));
    if (!token) {
      return moment().add(-1000, 'd').toDate();
    }
    return moment.unix(token.exp).toDate();
  }

  private decodeToken(token) {
    if (!token) {
      return null;
    }

    try {
      const base64Url = token.split()[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return null;
    }
  }

  getOrders(): Observable<any> {
    const url = APIURL + 'orders';
    return this.httpClient.get(url, { headers: headers });
  }
}

