import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services';

@Component({
  selector: 'app-sign-in-card',
  templateUrl: './sign-in-card.component.html',
  styleUrls: ['./sign-in-card.component.css']
})
export class SignInCardComponent implements OnInit {
  // TODO: Inject Auth service on the constructor's arg
  constructor(private _auth: AuthService) { }

  ngOnInit() { }

  isLoggedIn() {
    // TODO: Call auth service's isLogged in to determine whether the user is authenticated or not
    return this._auth.isLoggedIn();
  }

  onSignInClicked() {
    alert(`Not implemented !`);
  }
}
