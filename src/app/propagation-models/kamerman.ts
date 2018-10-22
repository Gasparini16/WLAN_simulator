import { Input, Injectable } from '@angular/core';
import { TxComponent } from '../tx-settings/tx/tx.component';

@Injectable ()
export class Kamerman {
  private oneMetterPathLoss: number;
  private eightMetterPathLoss: number;
  private kamermanPathLoss: [number, number];
  private pathLossExponnent = [2, 3.3];

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

    public solveKamerman(distance: number): [number, number] {
      const periodOfDistance = distance / 0.5 - 2;

      for ( let i = 1; i < periodOfDistance; i++) {
        if ((periodOfDistance * 0.5) <= 8) {
         const pathLoss = this.getOneMetterPathLoss() - this.pathLossExponnent[0] * 10 * Math.log(periodOfDistance * 0.5);
        this.kamermanPathLoss = [i * 0.5, pathLoss];
        }
        if ((periodOfDistance * 0.5) > 8) {
          const pathLoss = this.getEightMetterPathLoss() - this.pathLossExponnent[1] * 10 * Math.log(periodOfDistance * 0.5)
          - this.pathLossExponnent[1] * 10 * Math.log((periodOfDistance * 0.5) / 8);
          this.kamermanPathLoss = [i * 0.5, pathLoss];
          }
      }
      return this.kamermanPathLoss;
    }
}
