import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  private distance: number;
  private distanceInPixel: number;
  private distanceSubject = new Subject<number>();

  public solveDistance(x1: number, y1: number, x2: number, y2: number) {
    let currentDistance: number;
    currentDistance = Math.sqrt(Math.pow((x2 - x1), 2) +
      Math.pow((y2 - y1), 2));
    this.distanceInPixel = currentDistance;
    currentDistance = currentDistance / 38;
    currentDistance = currentDistance * 353; // angularMath.mul(this.distance, 353);
    currentDistance = currentDistance / 100; // angularMath.div(this.distance, 100);
    this.distance = currentDistance;
    this.distanceSubject.next(this.distance);
  }

  public getDistance(): number {
    return this.distance;
  }

  public getDistanceInPixel(): number {
    return this.distanceInPixel;
  }

  public clearDistance(zeroDistance: number) {
    this.distance = zeroDistance;
    this.distanceSubject.next(this.distance);
  }

  public getSubDistance(): Observable<number> {
    return this.distanceSubject.asObservable();
  }
}
