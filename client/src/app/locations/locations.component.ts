import { Component } from '@angular/core';

@Component({
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationComponent {
  location1 = { lat: 40.756691, lng: -73.980294 };
  location2 = { lat: 40.73956, lng: -73.99534 };
  location3 = { lat: 40.728772, lng: -73.988405 };
}
