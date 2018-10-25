import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User;

  constructor(private _firebaseAuth: AngularFireAuth) {
    this.user = this._firebaseAuth.authState;
  }

  signInWithTwitter() {
    // TODO: Implement this
    throw new Error('<AuthService.signInWithTwitter> is not implemented.');
  }

  signInWithFacebook() {
    // TODO: Implement this
    throw new Error('<AuthService.signInWithFacebook> is not implemented.');
  }

  signInWithGoogle() {
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
}
