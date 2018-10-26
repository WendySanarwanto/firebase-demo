import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable, Subscription } from 'rxjs';

const TOKEN_NOT_AVAILABLE = 'Not available';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private accessToken: string = TOKEN_NOT_AVAILABLE;

  constructor(private _firebaseAuth: AngularFireAuth) {
    this.user = this._firebaseAuth.authState;
    this.user.subscribe(
      user => {
        if (user) {
          this.userDetails = user;
          this.userDetails.getIdToken()
            .then(accessToken => this.accessToken = accessToken ? accessToken : TOKEN_NOT_AVAILABLE);
        } else {
          this.userDetails = null;
          this.accessToken = null;
        }
      }
    );
  }

  signInWithTwitter() {
    // TODO: Implement this
    throw new Error('<AuthService.signInWithTwitter> is not implemented.');
  }

  signInWithFacebook() {
    // TODO: Implement this
    throw new Error('<AuthService.signInWithFacebook> is not implemented.');
  }

  signInWithGoogle(): Promise<firebase.auth.UserCredential> {
    return this._firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }

  isLoggedIn() {
    return (this.userDetails === null) ? false : true;
  }

  logout() {
    return this._firebaseAuth.auth.signOut();
  }

  getAccessToken() {
    return this.accessToken;
  }

  subscribeToUserObject(subscriberFn: (user: firebase.User) => any): Subscription {
    return this.user.subscribe(subscriberFn);
  }

}
