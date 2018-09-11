import { Routes } from '@angular/router';
import { KEYNAMELOCALSTORAGE } from './../../constants/constant';
import { LocalStorageService } from './../../helpers/localStorage.service';
import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = new User('HungPrince', '123456', '123456');
  constructor(
    private auth: AuthService,
    private locaStorageService: LocalStorageService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.user).subscribe(result =>
      this.auth.getToken(this.user).subscribe(data => {
        if (data) {
          localStorage.setItem(KEYNAMELOCALSTORAGE.TOKEN_ID, JSON.stringify(data));
          localStorage.setItem(KEYNAMELOCALSTORAGE.CURRENT_USER, this.user.UserName);
          location.href = '/home';
        }
      })
    )
    err => console.log(err);
  }
}
