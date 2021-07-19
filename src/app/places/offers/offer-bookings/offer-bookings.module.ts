import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


import { IonicModule } from '@ionic/angular';

import { OfferBookingsPage } from './offer-bookings.page';
import { OfferBookingListComponent } from './offer-booking-list/offer-booking-list.component';

const routes: Routes = [
  {
    path: '',
    component: OfferBookingsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule
  ],
  declarations: [OfferBookingsPage, OfferBookingListComponent]
})
export class OfferBookingsPageModule {}
