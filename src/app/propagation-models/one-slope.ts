import { Injectable } from '@angular/core';

@Injectable({
providedIn: 'root'
})
export class OneSlope {
private oneMetterPathLoss: number;
private _realDistanceArray: number [] = [];
private _powerLevelAtSpecialPoint: number = 0;
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
  public solveOnSpecialDistance(distance: number, txPower: number){
    return  txPower - Math.round((this.getOneMetterPathLoss() + 33 * Math.log10(distance)) * 10) / 10;
  }

  public clearResultsArrays() {
  this._oneSlopePathLossArray.slice(0,this._oneSlopePathLossArray.length);
  this._realDistanceArray.slice(0,this._realDistanceArray.length);
  }

  get powerLevelAtSpecialPoint(): number {
    return this._powerLevelAtSpecialPoint;
  }

  set powerLevelAtSpecialPoint(value: number) {
    this._powerLevelAtSpecialPoint = value;
  }
}
