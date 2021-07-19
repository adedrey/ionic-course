import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../../place.model';

@Component({
  selector: 'app-discover-item',
  templateUrl: './discover-item.component.html',
  styleUrls: ['./discover-item.component.scss'],
})
export class DiscoverItemComponent implements OnInit {
  @Input() loadedPlaces: Place[];
  constructor() { }

  ngOnInit() {}

}
