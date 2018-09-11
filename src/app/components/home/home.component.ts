import { Router } from '@angular/router';
import { KEYNAMELOCALSTORAGE } from './../../constants/constant';
import { AuthService } from './../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  listOrders: any;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.getListOrders();
  }

  getListOrders() {
    this.authService.getOrders().subscribe(data => {this.listOrders = data; console.log(data)});
  }

  logOut() {
    localStorage.removeItem(KEYNAMELOCALSTORAGE.CURRENT_USER);
    localStorage.removeItem(KEYNAMELOCALSTORAGE.TOKEN_ID);
    location.href = '/login'
  }

}
