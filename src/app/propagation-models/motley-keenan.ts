import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MotleyKeenan {
  constructor () {}
  private _realDistance: number [] = [];
  private _motleyKeenanPathLoss: number [] = [];
  private readonly wallAttenuation: number = 4;

  public solveMotleyKeenan(distance: number, wavelength: number, distanceWallsList: number[], txPower: number) {
    let isWallsListNotEmpty = false;
    let periodOfDistance: number = distance / 0.5;
    let pathLoss: number;
    let wallCounter = 0;
    periodOfDistance = Math.round(periodOfDistance);
    this._realDistance[0] = 0;
    this._motleyKeenanPathLoss[0] = txPower;
    if (distanceWallsList.length > 0) {
      isWallsListNotEmpty = true;
    }
    switch (isWallsListNotEmpty) {
    case false:
      for ( let i = 1; i <= periodOfDistance; i++) {
        pathLoss = txPower - ( 20 * Math.log10((4 * Math.PI * i * 0.5) / wavelength));
        this._motleyKeenanPathLoss[i] = Math.round(pathLoss * 10) / 10;
        this._realDistance [i] = i * 0.5;
    }
    break;
    case true:
      for ( let i = 1; i <= periodOfDistance; i++) {
          for ( let j = 0; j < distanceWallsList.length; j++) {
            if (((i * 0.5) < distanceWallsList[j]) && ((i * 0.5 + 0.5) > distanceWallsList[j])) {
              ++wallCounter;
            }
          }
          pathLoss = txPower - ( 20 * Math.log10((4 * Math.PI * i * 0.5) / wavelength) + (wallCounter * this.wallAttenuation));
            this._motleyKeenanPathLoss[i] = Math.round(pathLoss * 10) / 10;
            this._realDistance [i] = i * 0.5;
      }
    break;
  }
}
  get motleyKeenanPathLoss(): number [] {
    return this._motleyKeenanPathLoss;
  }
  get realDistance(): number [] {
    return this._realDistance;
  }
}
