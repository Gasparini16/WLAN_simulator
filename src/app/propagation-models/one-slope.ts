import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class OneSlope {
private oneMetterPathLoss: number;
private _realDistanceArray: number [] = [];
get realDistanceArray(): number [] {
  return this._realDistanceArray;
}
private _oneSlopePathLossArray: number [] = [];
get oneSlopePathLossArray(): number [] {
  return this._oneSlopePathLossArray;
}



public solveOneMetterPathLoss(wavelength: number) {
    this.oneMetterPathLoss = 20 * Math.log10((4 * Math.PI) / wavelength);
  }
  public getOneMetterPathLoss(): number {
    return this.oneMetterPathLoss;
  }

   public solveOneSlope(distance: number, txPower: number) {
    let periodOfDistance: number = distance / 0.5;
    let pathLoss: number;
    periodOfDistance = Math.round(periodOfDistance) + 1;
    this._realDistanceArray[0] = 0;
    this._oneSlopePathLossArray[0] = txPower;
    for (let i = 1; i <= periodOfDistance; i++) {
    pathLoss = txPower - Math.round((this.getOneMetterPathLoss() + 33 * Math.log10((i * 0.5))) * 10) / 10;
    this._oneSlopePathLossArray[i] = pathLoss;
    this._realDistanceArray[i] = i * 0.5;
    }
  }
}
