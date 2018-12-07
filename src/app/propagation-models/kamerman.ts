import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Kamerman {
  private _oneMeterPathLoss: number;
  private _eightMeterPathLoss: number;
  private readonly pathLossExponnent: number[] = [2, 3.3];
  private _realDistance: number [] = [];
  private _kamermanPathLoss: number [] = [];
  private _powerLevelAtSpecialPoint: number;

  public solveOneMeterPathLoss(wavelength: number) {
    this._oneMeterPathLoss = 20 * Math.log10((4 * Math.PI) / wavelength);
  }

  public solveEightMeterPathLoss(wavelength: number) {
    this._eightMeterPathLoss = 20 * Math.log10((4 * Math.PI * 8) / wavelength);
  }

  get oneMeterPathLoss(): number {
    return this._oneMeterPathLoss;
  }

  get eightMeterPathLoss(): number {
    return this._eightMeterPathLoss;
  }

  public solveKamerman(distance: number, txPower: number) {
    let pathLoss = 0;
    this.kamermanPathLoss[0] = txPower;
    this.realDistance[0] = 0;
    let periodOfDistance = distance / 0.5;
    if((periodOfDistance % 1) <= 0.5) {
      periodOfDistance = Math.round(periodOfDistance) + 1;
    }
    else if((periodOfDistance % 1) > 0.5) {
      periodOfDistance = Math.round(periodOfDistance);
    }
    for (let i = 1; i <= periodOfDistance; i++) {
      if ((i * 0.5) <= 8) {
        pathLoss = txPower - (this.oneMeterPathLoss + this.pathLossExponnent[0] * 10 * Math.log10(i * 0.5));
        pathLoss = Math.round(pathLoss * 10) / 10;
        this.kamermanPathLoss[i] = pathLoss;
        this.realDistance[i] = i * 0.5;
      }
      if ((i * 0.5) > 8) {
        pathLoss = txPower - (this.eightMeterPathLoss + this.pathLossExponnent[1] * 10 * Math.log10(i * 0.5 / 8));
        pathLoss = Math.round(pathLoss * 10) / 10;
        this.kamermanPathLoss[i] = pathLoss;
        this.realDistance[i] = i * 0.5;
      }
    }
  }

  public solveOnSpecialDistance(distance: number, txPower: number): number {
    if (distance <= 8)
      return (txPower - (this.oneMeterPathLoss + this.pathLossExponnent[0] * 10 * Math.log10(distance)));
    else if (distance > 8) {
      return (txPower - (this.eightMeterPathLoss + this.pathLossExponnent[1] * 10 * Math.log10(distance / 8)));
    }
  }

  get kamermanPathLoss(): number [] {
    return this._kamermanPathLoss;
  }

  get realDistance(): number [] {
    return this._realDistance;
  }

  set kamermanPathLoss(value: number[]) {
    this._kamermanPathLoss = value;
  }

  set realDistance(value: number[]) {
    this._realDistance = value;
  }

  public clearResultsArrays() {
    this.kamermanPathLoss = [];
    this.realDistance = [];
  }

  get powerLevelAtSpecialPoint(): number {
    return this._powerLevelAtSpecialPoint;
  }
}
