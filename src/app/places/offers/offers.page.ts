import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { UtilService } from 'src/app/shared/util.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss']
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  userId: string;
  places: Place[] = [];
  placeSubscription: Subscription;

  constructor(
    private placesService: PlacesService,
    private router: Router,
    private utilService: UtilService,
    private loadingCtrl: LoadingController
  ) {
    this.utilService.userId.subscribe(userId => {
      this.userId = userId;
    });
  }

  ngOnInit() {
    this.loadingCtrl.create({ spinner: 'dots' })
      .then(loadingEl => {
        loadingEl.present();
        this.placeSubscription = this.placesService.getPlaces()
          .subscribe(places => {
            loadingEl.dismiss();
            this.places = places;
            console.log(this.userId);
            this.offers = this.places.filter(p => p.userId == this.userId);
          });
      });
  }

  ionViewWillEnter() {
    if (this.places.length >= 0) {
      this.utilService.userId.subscribe(userId => {
        this.userId = userId;
        this.offers = this.places.filter(p => p.userId == this.userId);
      });
    }
  }
  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', offerId]);
    console.log('Editing item', offerId);
  }

  ngOnDestroy() {
    this.placeSubscription.unsubscribe();
  }
}
