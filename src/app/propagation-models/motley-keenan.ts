import { Injectable } from '@angular/core';
import { angularMath } from 'angular-ts-math';
import { DistanceService } from '../indoor-map/distance-algorithm/distanceService';

@Injectable({
  providedIn: 'root'
})
export class MotleyKeenan {
  constructor () {}
  private realDistance: number [];
  private motleyKeenanPathLoss: number [];

  public solveMotleyKeenan(distance: number, wavelength: number, distanceWallsList: number[]) {
    const periodOfDistance = distance / 0.5;
    let isWallsListNotEmpty = false;
    let pathLoss: number;
    Math.round(periodOfDistance);
    if (distanceWallsList.length > 0) {
      isWallsListNotEmpty = true;
    }
    for ( let i = 0; i < periodOfDistance; i++) {
      if (!isWallsListNotEmpty) {
      pathLoss = 20 * Math.log((4 * Math.PI * (i * 0.5)) / wavelength);
      this.motleyKeenanPathLoss[i] = Math.round(pathLoss * 10) / 10;
      this.realDistance[i] = i * 0.5;
      }
      if (isWallsListNotEmpty) {
          for (let j = 0; j < distanceWallsList.length; j++) {
            if ( ((i * 0.5) > distanceWallsList[j]) && (i * 0.5 - distanceWallsList[j]) < 0.5) {
              pathLoss = 20 * Math.log((4 * Math.PI * (i * 0.5)) / wavelength) + 3;
              this.motleyKeenanPathLoss[i] = Math.round(pathLoss * 10) / 10;
              this.realDistance[i] = i * 0.5;
            }
          }
      }
    }
  }
  public getMotleyKeenanPathLoss(): number[] {
    return this.motleyKeenanPathLoss;
  }
  public getMotleyKeenanRealDistanceArray(): number[] {
    return this.realDistance;
  }
}
