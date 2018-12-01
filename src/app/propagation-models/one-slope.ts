import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OneSlope {
  private _oneMetterPathLoss: number;
  private _realDistanceArray: number [] = [];
  private _powerLevelAtSpecialPoint: number = 0;
  private _oneSlopePathLossArray: number [] = [];

  get realDistanceArray(): number [] {
    return this._realDistanceArray;
  }

  get oneSlopePathLossArray(): number [] {
    return this._oneSlopePathLossArray;
  }

  set realDistanceArray(value: number[]) {
    this._realDistanceArray = value;
  }

  set oneSlopePathLossArray(value: number[]) {
    this._oneSlopePathLossArray = value;
  }

  set oneMetterPathLoss(value: number) {
    this._oneMetterPathLoss = value;
  }

  get oneMetterPathLoss(): number {
    return this._oneMetterPathLoss;
  }

  public solveOneMetterPathLoss(wavelength: number) {
    this.oneMetterPathLoss = 20 * Math.log10((4 * Math.PI) / wavelength);
  }

  public solveOneSlope(distance: number, txPower: number) {
    let periodOfDistance = distance / 0.5;
    if((periodOfDistance % 1) <= 0.5) {
      periodOfDistance = Math.round(periodOfDistance) + 1;
    }
    else if((periodOfDistance % 1) > 0.5) {
      periodOfDistance = Math.round(periodOfDistance);
    }
    let pathLoss: number;
    this.realDistanceArray[0] = 0;
    this.oneSlopePathLossArray[0] = txPower;
    for (let i = 1; i <= periodOfDistance; i++) {
      pathLoss = txPower - Math.round((this.oneMetterPathLoss + 33 * Math.log10((i * 0.5))) * 10) / 10;
      this.oneSlopePathLossArray[i] = pathLoss;
      this.realDistanceArray[i] = i * 0.5;
    }
  }

  public solveOnSpecialDistance(distance: number, txPower: number) {
    return txPower - Math.round((this.oneMetterPathLoss + 33 * Math.log10(distance)) * 10) / 10;
  }

  public clearResultsArrays() {
    this.oneSlopePathLossArray = [];
    this.realDistanceArray = [];
  }

  get powerLevelAtSpecialPoint(): number {
    return this._powerLevelAtSpecialPoint;
  }

  set powerLevelAtSpecialPoint(value: number) {
    this._powerLevelAtSpecialPoint = value;
  }
}
