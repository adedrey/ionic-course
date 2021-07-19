
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Place } from './place.model';
import { PlacesService } from './places.service';

@Injectable({providedIn: 'root'})
export class PlaceResolver implements Resolve<Place> {
    constructor(private placeService: PlacesService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Place> {
        const placeId = route.paramMap.get('placeId');
        return this.placeService.getPlace(placeId);
    }
}