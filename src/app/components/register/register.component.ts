import { AuthService } from './../../services/auth/auth.service';
import { User } from './../../models/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  constructor(private auth: AuthService) { console.log('abc') }

  ngOnInit() {
    this.user = new User('HungPrince', '123456', '123456');
  }

  register() {
    this.auth.register(this.user).subscribe(result => console.log(result));
  }

}
