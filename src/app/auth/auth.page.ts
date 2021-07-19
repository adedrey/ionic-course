import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { LoadingController } from '@ionic/angular';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss']
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;
  credentialForm: FormGroup;
  title: string = 'Login';
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.init();
  }

  onLogin() {
    //
    this.title = 'Please wait...';
    const email = this.credentialForm.value.email;
    const password = this.credentialForm.value.password;
    this.loadingCtrl.create({ spinner: "dots" })
      .then(loadingEl => {
        loadingEl.present();
        this.authService.login(email, password)
          .then(() => {
            loadingEl.dismiss()
            this.title = 'Login';
            this.router.navigateByUrl('/places');
          }, (error) => {
            loadingEl.dismiss();
            this.title = 'Login';
            alert(error.message);
          })
      })
  }
  private init() {
    this.credentialForm = new FormGroup({
      'email': new FormControl(null, [Validators.email]),
      'password': new FormControl(null, [Validators.required])
    });
  }
}
