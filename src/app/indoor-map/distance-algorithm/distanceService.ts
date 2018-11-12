import { Injectable } from '@angular/core';
import { angularMath } from 'angular-ts-math';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  private  distance: number;
  private distanceInPixel: number;

  public solveDistance(x1: number, y1: number, x2: number, y2: number) {
    let currentDistance: number;
    currentDistance = Math.sqrt(Math.pow((x2 - x1), 2) +
    Math.pow((y2 - y1) , 2));
    this.distanceInPixel = currentDistance;
    currentDistance = currentDistance / 38;
    currentDistance = currentDistance * 353; // angularMath.mul(this.distance, 353);
    currentDistance = currentDistance / 100; // angularMath.div(this.distance, 100);
    this.distance = currentDistance;
  }

  public getDistance(): number {
    return this.distance;
  }
  public getDistanceInPixel(): number {
    return this.distanceInPixel;
  }
}
