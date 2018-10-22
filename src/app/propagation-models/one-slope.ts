import { Injectable } from '@angular/core';

@Injectable()
export class OneSlope {
private oneMetterPathLoss: number;
private oneSlopePathLoss: [number, number];

public solveOneMetterPathLoss(wavelength: number) {
    this.oneMetterPathLoss = 20 * Math.log((4 * Math.PI) / wavelength);
  }
  public getOneMetterPathLoss(): number {
    return this.oneMetterPathLoss;
  }

  public solveOneSlope(distance: number): [number, number] {
    let periodOfDistance = distance / 0.5 - 2;

    for ( let i = 1; i < periodOfDistance; i++) {
      let pathLoss = this.getOneMetterPathLoss() - 33 * Math.log(periodOfDistance * 0.5);
      this.oneSlopePathLoss = [i * 0.5, pathLoss];
    }

    return this.oneSlopePathLoss;
  }
}
