import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation?: [number, number];

  constructor() {
      this.getUserLocation();
    }

  public getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      ({coords}) => {
        this.userLocation = [coords.latitude, coords.longitude];
      }
    );
  }
}
