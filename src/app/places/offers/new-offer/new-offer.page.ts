import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { UtilService } from 'src/app/shared/util.service';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.page.html',
  styleUrls: ['./new-offer.page.scss']
})
export class NewOfferPage implements OnInit {
  form: FormGroup;
  userId: any;
  constructor(
    private placesService: PlacesService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private utilService: UtilService
  ) {
    this.utilService.userId.subscribe(id => {
      this.userId = id;
    })
  }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(1)]
      }),
      dateFrom: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      dateTo: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  onCreateOffer() {
    if (!this.form.valid) {
      return;
    }
    const title = this.form.value.title;
    const description = this.form.value.description;
    const price = this.form.value.price;
    const availableFrom = this.form.value.dateFrom;
    const availableTO = this.form.value.dateTo;
    const imageUrl = 'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200';
    const addedAt = new Date()
    const place: Place = {
      title:title,
      description: description,
      price: price,
      availableFrom: availableFrom,
      availableTo: availableTO,
      imageUrl: imageUrl,
      addedAT: addedAt,
      userId: this.userId
    };
    this.loadingCtrl
      .create({
        spinner: "lines-small"
      })
      .then(loadingEl => {
        loadingEl.present();
        this.placesService.addPlace(place)
        .subscribe(response => {
          console.log(response);
          loadingEl.dismiss();
          this.router.navigateByUrl('/places/tabs/offers');
        });
      });
  }
}
