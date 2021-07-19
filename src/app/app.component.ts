import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AuthService } from './auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UtilService } from './shared/util.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private utilService: UtilService
  ) {
    this.initializeApp();
    this.utilService.getUserId();
    // this.afAuth.authState.subscribe(user => console.log(user));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  onLogout() {
    this.authService.logout()
    .then(response => {
      this.utilService.userId.next(null);
      this.router.navigateByUrl('/auth');
    })
  }
}
