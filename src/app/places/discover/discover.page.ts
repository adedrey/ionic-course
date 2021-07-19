import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuController, LoadingController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription, Observable } from 'rxjs';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { AuthService } from '../../auth/auth.service';
import { UtilService } from 'src/app/shared/util.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss']
})
export class DiscoverPage implements OnInit, OnDestroy {
  loadedPlaces: Place[] = [];
  listedLoadedPlaces: Place[] = [];
  relevantPlaces: Place[] = [];
  userId: string;
  private placesSub: Subscription;
  places$: Observable<Place[]>;

  constructor(
    private placesService: PlacesService,
    private loadingControl: LoadingController,
    private menuCtrl: MenuController,
    private authService: AuthService,
    private utilService: UtilService
  ) {
    this.utilService.userId.subscribe(id => {
      this.userId = id;
    });
  }

  ngOnInit() {
    this.loadingControl.create({ spinner: "lines-small" })
      .then(loadingEl => {
        loadingEl.present();
        this.placesSub = this.placesService.getPlaces().subscribe(places => {
          loadingEl.dismiss();
          this.loadedPlaces = places;
          this.relevantPlaces = this.loadedPlaces;
          this.listedLoadedPlaces = this.relevantPlaces.slice(1);
        });
      })
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>) {
    if (event.detail.value === 'all') {
      this.relevantPlaces = this.loadedPlaces;
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    } else {
      this.relevantPlaces = this.loadedPlaces.filter(
        place => place.userId !== this.userId
      );
      this.listedLoadedPlaces = this.relevantPlaces.slice(1);
    }
  }

  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
