import {Component, inject, OnInit} from '@angular/core';

import {PlacesService} from "../places.service";
import { icon, Map, marker, tileLayer } from 'leaflet';
import {ActivatedRoute} from "@angular/router";
import {HousingService} from "../housing.service";
import {Housinglocation} from "../housinglocation";
@Component({
  selector: 'app-house-map',
  standalone: true,
  imports: [],
  templateUrl: './house-map.component.html',
  styleUrl: './house-map.component.css'
})
export class HouseMapComponent implements OnInit {

  route: ActivatedRoute = inject(ActivatedRoute);

  housingService: HousingService = inject(HousingService);

  housingLocation: Housinglocation | undefined;

  geo: any;
  map: any;

  weather: any;
  condition!:string;
  image!:string;
  temperature!:string;

  constructor(private placeSvc: PlacesService) {
    const housingLocationId = Number(this.route.snapshot.params['id']);

    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  ngOnInit() {

    setTimeout(() => {

      this.geo = this.housingLocation?.coordinate;

        this.getWeather(`http://api.weatherapi.com/v1/current.json?key=170804494a18441290f211125241902&q=${this.geo}&aqi=no`)
        .then(weather => {
          this.weather = weather
          this.condition = this.weather.current.condition.text;
          this.image = this.weather.current.condition.icon
          this.temperature = this.weather.current.temp_c;
        });


    }, 1000);

  }

  ngAfterViewInit() {

    setTimeout(() => {
      this.map = new Map('map').setView(this.geo, 13);

      tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

    }, 1000);

  }

  ubicate() {
    setTimeout(() => {
      marker(this.geo).addTo(this.map).bindPopup("<strong>This is the location</strong>").openPopup();
    }, 1000);
  }

  reload() {
    location.reload();
  }

  async getWeather(url: string) {
    let data = await fetch(url);
    if (data.ok) {
      return data.json();
    }
  }
}
