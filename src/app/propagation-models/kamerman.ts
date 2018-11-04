import { Input, Injectable } from '@angular/core';
import { TxComponent } from '../tx-settings/tx/tx.component';

@Injectable ()
export class Kamerman {
  private oneMetterPathLoss: number;
  private eightMetterPathLoss: number;
  private kamermanPathLoss: [number];
  private pathLossExponnent = [2, 3.3];
  private realDistance: number [];

  public solveOneMetterPathLoss(wavelength: number) {
      this.oneMetterPathLoss = 20 * Math.log((4 * Math.PI) / wavelength);
    }

    public solveEightMetterPathLoss(wavelength: number) {
      this.oneMetterPathLoss = 20 * Math.log((4 * Math.PI * 8) / wavelength);
    }
    public getOneMetterPathLoss(): number {
      return this.oneMetterPathLoss;
    }

    public getEightMetterPathLoss(): number {
      return this.eightMetterPathLoss;
    }

    public solveKamerman(distance: number) {
      const periodOfDistance = distance / 0.5;
      let pathLoss = 0;
      Math.round(periodOfDistance);
      for ( let i = 0; i < periodOfDistance; i++) {
        if ((i * 0.5) <= 8) {
        pathLoss = this.getOneMetterPathLoss() - this.pathLossExponnent[0] * 10 * Math.log(i * 0.5);
        this.kamermanPathLoss[i] = Math.round(pathLoss * 10) / 10;
        this.realDistance[i] = i * 0.5;
        }
        if ((i * 0.5) > 8) {
          pathLoss = this.getEightMetterPathLoss() - this.pathLossExponnent[1] * 10 * Math.log(i * 0.5)
          - this.pathLossExponnent[1] * 10 * Math.log((i * 0.5) / 8);
          this.kamermanPathLoss[i] = Math.round(pathLoss * 10) / 10;
          this.realDistance[i] = i * 0.5;
          }
      }
    }
}
