import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loading = false;
  user: User;
  userFromApi: User;

  constructor(
    private userService : UserService,
    private authenticationService : AuthenticationService
  ) { 
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getById(this.user.id).pipe(first().subscribe(user =>{
      this.loading = false;
      this.userFromApi = user;
    }))
  }

}
