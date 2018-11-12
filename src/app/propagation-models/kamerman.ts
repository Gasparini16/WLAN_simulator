import { Input, Injectable } from '@angular/core';

@Injectable ({
  providedIn: 'root'
})
export class Kamerman {
  private oneMetterPathLoss: number;
  private eightMetterPathLoss: number;
  private pathLossExponnent: number[] = [2, 3.3];
  private _realDistance: number [] = [];
  private _kamermanPathLoss: number [] = [];
  public solveOneMetterPathLoss(wavelength: number) {
      this.oneMetterPathLoss = 20 * Math.log10((4 * Math.PI) / wavelength);
    }

    public solveEightMetterPathLoss(wavelength: number) {
      this.eightMetterPathLoss = 20 * Math.log10((4 * Math.PI * 8) / wavelength);
    }
    public getOneMetterPathLoss(): number {
      return this.oneMetterPathLoss;
    }

    public getEightMetterPathLoss(): number {
      return this.eightMetterPathLoss;
    }

    public solveKamerman(distance: number, txPower: number) {
      let periodOfDistance: number = distance / 0.5;
      let pathLoss = 0;
      periodOfDistance = Math.round(periodOfDistance);
      this._kamermanPathLoss[0] = txPower;
      this._realDistance[0] = 0;
       for (let i = 1; i <= periodOfDistance; i++) {
        if ((i * 0.5) <= 8) {
          pathLoss = txPower - (this.getOneMetterPathLoss() + this.pathLossExponnent[0] * 10 * Math.log10(i * 0.5));
          pathLoss = Math.round(pathLoss * 10) / 10;
          this._kamermanPathLoss[i] = pathLoss;
          this._realDistance[i] = i * 0.5;
        }
        if ((i * 0.5) > 8) {
            pathLoss = txPower - (this.getEightMetterPathLoss() + this.pathLossExponnent[1] * 10 * Math.log10(i * 0.5)
            + this.pathLossExponnent[1] * 10 * Math.log10(i * 0.5 / 8));
            pathLoss = Math.round(pathLoss * 10) / 10;
            this._kamermanPathLoss[i] = pathLoss;
            this._realDistance[i] = i * 0.5;
          }
      }
    }
    get kamermanPathLoss(): number [] {
      return this._kamermanPathLoss;
    }
    get realDistance(): number [] {
      return this._realDistance;
    }
}
