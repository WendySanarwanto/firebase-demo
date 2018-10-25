import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services';

@Component({
  selector: 'app-sign-in-card',
  templateUrl: './sign-in-card.component.html',
  styleUrls: ['./sign-in-card.component.css']
})
export class SignInCardComponent implements OnInit {
  constructor(private _auth: AuthService) { }

  ngOnInit() { }

  isLoggedIn() {
    return this._auth.isLoggedIn();
  }

  async onSignInClicked() {
    try {
      await this._auth.signInWithGoogle();
    } catch (err) {
      const errMsg = `Sign in error: ${err.message}`;
      console.log(`[ERROR] - <SignInCardComponent.onSignInClicked> Details: \n`, err);
      // TODO: Replace alert with Error Toaster/Band
      alert(errMsg);
    }
  }
}
