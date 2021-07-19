import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { take, tap, delay, first, map } from 'rxjs/operators';

import { Booking } from './booking.model';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { convertResponse } from '../shared/db-util';

@Injectable({ providedIn: 'root' })
export class BookingService {
  private _bookings = new BehaviorSubject<Booking[]>([]);

  get bookings() {
    return this._bookings.asObservable();
  }

  constructor(
    private authService: AuthService,
    private db: AngularFirestore
    ) {}

  addBooking(
    placeId: string,
    userId: string,
    firstName: string,
    lastName: string,
    guestNumber: number,
    dateFrom: Date,
    dateTo: Date
  ): Observable<any> {
    const booking: Booking = {
      firstName: firstName,
      lastName: lastName,
      guestNumber: guestNumber,
      bookedFrom: dateFrom,
      bookedTo: dateTo,
      userId: userId
    };
    const bookingId = this.db.createId();
    return from (this.db.collection(`/places/`).doc(`${placeId}`).collection(`/booking`).doc(`${bookingId}`).set(booking)); 
  }

  findBookings(placeId:string, pageNumber = 0, pageSize = 3): Observable<Booking[]> {
    return this.db.collection(`/places/${placeId}/booking`, ref => ref.orderBy('guestNumber', 'asc').limit(pageSize)
    .startAfter(pageNumber * pageSize)).snapshotChanges()
    .pipe(map(responseData => convertResponse<Booking>(responseData)), first());
  }

  cancelBooking(bookingId: string) {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        this._bookings.next(bookings.filter(b => b.id !== bookingId));
      })
    );
  }
}
