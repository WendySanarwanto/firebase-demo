import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services';

@Component({
  selector: 'app-sign-out-card',
  templateUrl: './sign-out-card.component.html',
  styleUrls: ['./sign-out-card.component.css']
})
export class SignOutCardComponent implements OnInit {
  constructor(private _auth: AuthService) { }

  ngOnInit() { }

  isLoggedIn() {
    return this._auth.isLoggedIn();
  }

  async onSignOutClicked() {
    await this._auth.logout();
  }

  getAccessToken() {
    return this._auth.getAccessToken();
  }
}
