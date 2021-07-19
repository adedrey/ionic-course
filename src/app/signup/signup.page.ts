import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  signupForm: FormGroup
  title: string = 'Sign up';
  constructor(
    private authService: AuthService,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    this.init();
  }
  private init() {
    this.signupForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit() {
    this.title = 'Please wait...';
    const email = this.signupForm.value.email;
    const password = this.signupForm.value.password;
    const name = this.signupForm.value.name;
    this.authService.register(email, password)
      .then((userCredential: firebase.auth.UserCredential) => {
        console.log(userCredential);
        this.db.collection(`users/`).doc(`${userCredential.user.uid}`)
          .set({
            id: userCredential.user.uid,
            name: name
          });
        this.router.navigateByUrl('/places');
      }, (error) => {
        this.title = "Sign Up";
        alert(error.message);
      });
  }

}
