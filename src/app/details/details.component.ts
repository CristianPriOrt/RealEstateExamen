import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {ActivatedRoute, RouterLink} from '@angular/router';
import { HousingService } from '../housing.service';
import { Housinglocation } from '../housinglocation';

import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink
  ],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo"
           alt="Exterior photo of {{housingLocation?.name}}"/>
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
        <h2>Location score:</h2>
        <div id="div_stars">

          <img src="../../assets/starOn.png">
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
      </section>
      <section class="listing-apply">
        <h2 class="section-heading">Apply now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstName">

          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastName">

          <label for="email">Email</label>
          <input id="email" type="email" formControlName="email">
          <button type="submit" class="primary">Apply now</button>
        </form>
        <h2><a [routerLink]="['/map', housingLocation?.id]">Map</a></h2>
      </section>
      <section>
        <h2 class="section-heading">Rate this housing location</h2>
        <form>
          <img id="img_star1" (click)="setScore(1)" src="../../assets/starOn.png">
          <img id="img_star2" (click)="setScore(2)" src="../../assets/starOff.png">
          <img id="img_star3" (click)="setScore(3)" src="../../assets/starOff.png">
          <img id="img_star4" (click)="setScore(4)" src="../../assets/starOff.png">
          <img id="img_star5" (click)="setScore(5)" src="../../assets/starOff.png">

          <br><br>
          <button type="submit" class="primary" (click)="submitScore()">Submit</button>

        </form>


      </section>
    </article>
  `,
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  score: number = 1;

  housingService: HousingService = inject(HousingService);

  housingLocation: Housinglocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9]+@[a-z0-9]+\\.[a-z]+$")])
  });

  constructor() {

  }

  ngOnInit() {

    const housingLocationId = Number(this.route.snapshot.params['id']);

    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  submitApplication() {
    if(this.applyForm.valid) {
      localStorage.setItem("form", `${this.applyForm.value.firstName}, ${this.applyForm.value.lastName}, ${this.applyForm.value.email}`);
      this.housingService.submitApplication(
        this.applyForm.value.firstName ?? '',
        this.applyForm.value.lastName ?? '',
        this.applyForm.value.email ?? ''
      );
    }else {
      alert("Invalid form");
    }
  }

  clearStars() {
    for(let i = 5; i > 1; i--) {
      let rated = document.getElementById("img_star" + i);
      rated!.setAttribute('src', "../../assets/starOff.png");
    }
  }

  setScore(score: number) {
    let star;

    this.score = score;

    this.clearStars();

    for(let i = score; i > 1; i--) {
      star = document.getElementById("img_star" + i);
      star!.setAttribute('src', "../../assets/starOn.png");
    }
  }

  submitScore() {
    this.clearStars();
    alert("Successfully rated with " + this.score + " stars");
  }

}
