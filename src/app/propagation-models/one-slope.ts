import { Injectable } from '@angular/core';

@Injectable()
export class OneSlope {
private oneMetterPathLoss: number;
// private oneSlopePathLoss: {[index: number]: [number]};
private realDistance: number [];
private oneSlopePathLoss: number [];

public solveOneMetterPathLoss(wavelength: number) {
    this.oneMetterPathLoss = 20 * Math.log((4 * Math.PI) / wavelength);
  }
  public getOneMetterPathLoss(): number {
    return this.oneMetterPathLoss;
  }

  public solveOneSlope(distance: number) {
    const periodOfDistance = distance / 0.5;
    Math.round(periodOfDistance);
    for ( let i = 0; i < periodOfDistance; i++) {
      const pathLoss = this.getOneMetterPathLoss() - 33 * Math.log(periodOfDistance * 0.5);
      this.realDistance[i] = periodOfDistance;
      this.oneSlopePathLoss[i] = Math.round(pathLoss * 10) / 10;
    }
  }
}
