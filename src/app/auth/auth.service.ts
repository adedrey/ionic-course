import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _userIsAuthenticated = true;
  private _userId = 'xyz';

  constructor(
    private afAuth: AngularFireAuth
  ) { }

  register(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(
          res => resolve(res),
          err => reject(err))
    });
  }

  get userIsAuthenticated() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }



  login(email, password) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        res => resolve(res),
        err => reject(err))
    });
  }

  logout() {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signOut()
        .then(() => {
          resolve();
        })
        .catch((error)  => {
          reject();
        })
    });
  }
}
