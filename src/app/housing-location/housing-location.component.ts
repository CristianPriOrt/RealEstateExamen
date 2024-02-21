import { Component, Input } from '@angular/core';
import {CommonModule, NgIf} from "@angular/common";
import { Housinglocation } from "../housinglocation";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-housing-location',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    NgIf
  ],
  template: `
    <section class="listing">
      <img class="listing-photo" [src]="housingLocation.photo" alt="Exterior photo of {{housingLocation.name}}">
      <h2 class="listing-heading">{{ housingLocation.name }}</h2>
      <div id="div_stars">

        <img *ngIf="housingLocation!.score > 0; else zeroStars" src="../../assets/starOn.png">
        <ng-template #zeroStars>
          <img src="../../assets/starOff.png">
        </ng-template>
        <img *ngIf="housingLocation!.score > 1; else oneStars" src="../../assets/starOn.png">
        <ng-template #oneStars>
          <img src="../../assets/starOff.png">
        </ng-template>
        <img *ngIf="housingLocation!.score > 2; else twoStars" src="../../assets/starOn.png">
        <ng-template #twoStars>
          <img src="../../assets/starOff.png">
        </ng-template>
        <img *ngIf="housingLocation!.score > 3; else threeStars" src="../../assets/starOn.png">
        <ng-template #threeStars>
          <img src="../../assets/starOff.png">
        </ng-template>
        <img *ngIf="housingLocation!.score > 4; else fourStars" src="../../assets/starOn.png">
        <ng-template #fourStars>
          <img src="../../assets/starOff.png">
        </ng-template>

      </div>
      <p class="listing-location">{{ housingLocation.city}}, {{housingLocation.state }}</p>
      <a [routerLink]="['/details', housingLocation.id]">Learn More</a>
    </section>
  `,
  styleUrl: './housing-location.component.css'
})
export class HousingLocationComponent {
  @Input() housingLocation!: Housinglocation;
}
