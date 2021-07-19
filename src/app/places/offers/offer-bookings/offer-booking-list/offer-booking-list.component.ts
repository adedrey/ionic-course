import { Component, OnInit, Input } from '@angular/core';
import { Booking } from 'src/app/bookings/booking.model';
import { BookingService } from 'src/app/bookings/booking.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-offer-booking-list',
  templateUrl: './offer-booking-list.component.html',
  styleUrls: ['./offer-booking-list.component.scss'],
})
export class OfferBookingListComponent implements OnInit {
  bookings: Booking[];
  @Input() placeId: string;
  loading: boolean = false;
  displayedColumns = ['name', 'guestnumber', 'bookFrom', 'bookTo'];
  dataSource: any;
  bookingCounter = 0;
  constructor(
    private bookingService: BookingService
  ) { }

  ngOnInit() {
    this.loading = true;
    this.bookingService.findBookings(this.placeId)
    .pipe(finalize(() => this.loading = false))
    .subscribe(bookings => {
      this.bookings = bookings
    });
  }

  loadMore() {
    // ...
    this.bookingCounter++;
    console.log(this.bookingCounter);
    this.loading = true;
    this.bookingService.findBookings(this.placeId, this.bookingCounter)
    .pipe(finalize(() => this.loading = false))
    .subscribe(bookings => this.bookings = this.bookings.concat(bookings));
  }

}
