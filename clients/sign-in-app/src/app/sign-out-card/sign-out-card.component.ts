import { Component, OnInit, OnDestroy } from '@angular/core';

import { AuthService } from '../services';
import { Subscription } from 'rxjs';

const TOKEN_NOT_AVAILABLE = 'Not available';

@Component({
  selector: 'app-sign-out-card',
  templateUrl: './sign-out-card.component.html',
  styleUrls: ['./sign-out-card.component.css']
})
export class SignOutCardComponent implements OnInit, OnDestroy {
  accessToken: Promise<string> = Promise.resolve(TOKEN_NOT_AVAILABLE);
  subscriptionToAuthSvc: Subscription;

  constructor(private _auth: AuthService) { }

  ngOnInit() {
    this.subscriptionToAuthSvc = this._auth.subscribeToUserObject(async(user) => {
      let accessToken = user ? await user.getIdToken() : null;
      this.accessToken = Promise.resolve(accessToken !== null ? `Bearer ${accessToken}` : TOKEN_NOT_AVAILABLE);
    });
  }

  ngOnDestroy() {
    this.subscriptionToAuthSvc.unsubscribe();
  }

  isLoggedIn() {
    return this._auth.isLoggedIn();
  }

  async onSignOutClicked() {
    await this._auth.logout();
  }
}
