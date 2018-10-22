import { Injectable } from '@angular/core';
import { angularMath } from 'angular-ts-math';

@Injectable()
export class DistanceService {
  private distance: number;

  public solveDistance(x1: number, y1: number, x2: number, y2: number) {
    this.distance = angularMath.squareOfNumber(angularMath.powerOfNumber((x2 - x1), 2) +
    angularMath.powerOfNumber((y2 - y1) , 2));
    this.distance = angularMath.div(this.distance, 38);
    this.distance = angularMath.mul(this.distance, 353);
    this.distance = angularMath.div(this.distance, 100);
  }

  public getDistance(): number {
    return this.distance;
  }
}
