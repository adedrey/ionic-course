import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { take, map, tap, delay, first } from 'rxjs/operators';

import { Place } from './place.model';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { convertResponse } from '../shared/db-util';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
 
  get places() {
    return undefined;
  }

  constructor(private authService: AuthService, private db: AngularFirestore) {}

  getPlaces(): Observable<Place[]> {
    return this.db.collection(`/places/`, ref => ref.orderBy('addedAT', 'desc')).snapshotChanges()
    .pipe(map(responseData => convertResponse<Place>(responseData)));
  }

  getPlace(id: string): Observable<Place> {
    return this.db.doc(`places/${id}`).snapshotChanges()
    .pipe(map(responseData => {
      const place: any = responseData.payload.data();
      return <Place> {
        id: responseData.payload.id,
        ...place
      }
    }), first());
  }

  addPlace(place: Place): Observable<any> {
    const id = this.db.createId();
    return from (this.db.collection('places').doc(`${id}`).set(place));
  }

  savePlace(placeId: string, changes: Partial<Place>): Observable<any> {
    return from (this.db.doc(`places/${placeId}`).update(changes));
  }
}
