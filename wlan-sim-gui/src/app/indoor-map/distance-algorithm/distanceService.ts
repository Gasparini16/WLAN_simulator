import {Injectable} from '@angular/core';
import {Observable, Subject} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class DistanceService {
  private _distance: number;
  private _coordinateXTransceiver: number;
  private _coordinateYTransceiver: number;
  private distanceInPixel: number;
  private distanceSubject = new Subject<number>();
  private _distanceForHeatMap: number = 0;
  private _distanceInPixelForHeatMap: number = 0;
  private _scale: number;

  set scale(value: number) {
    this._scale = value;
  }

  get scale(): number {
    return this._scale;
  }

  public solveDistance(x1: number, y1: number, x2: number, y2: number) {
    let currentDistance: number;
    currentDistance = Math.sqrt(Math.pow((x2 - x1), 2) +
      Math.pow((y2 - y1), 2));
    this.distanceInPixel = currentDistance;
    currentDistance = currentDistance / 38;
    currentDistance = currentDistance * this.scale; // angularMath.mul(this.distance, 353);
    currentDistance = currentDistance / 100; // angularMath.div(this.distance, 100);
    this.distance = currentDistance;
    this.distanceSubject.next(this.distance);
  }
  public solveDistanceForHeatMap(x1: number, y1: number, x2: number, y2: number){
    let currentDistance: number;
    currentDistance = Math.sqrt(Math.pow((x2 - x1), 2) +
      Math.pow((y2 - y1), 2));
    this._distanceInPixelForHeatMap = currentDistance;
    currentDistance = currentDistance / 38;
    currentDistance = currentDistance * this.scale; // angularMath.mul(this.distance, 353);
    currentDistance = currentDistance / 100; // angularMath.div(this.distance, 100);
    this._distanceForHeatMap = currentDistance;
  }
  public getDistance(): number {
    return this._distance;
  }

  public getDistanceInPixel(): number {
    return this.distanceInPixel;
  }

  public clearDistance(zeroDistance: number) {
    this._distance = zeroDistance;
    this.distanceSubject.next(this._distance);
  }

  public getSubDistance(): Observable<number> {
    return this.distanceSubject.asObservable();
  }
  get coordinateXTransceiver(): number {
    return this._coordinateXTransceiver;
  }
  set coordinateXTransceiver(value: number) {
    this._coordinateXTransceiver = value;
  }
  get coordinateYTransceiver(): number {
    return this._coordinateYTransceiver;
  }
  set coordinateYTransceiver(value: number) {
    this._coordinateYTransceiver = value;
  }


  get distanceInPixelForHeatMap(): number {
    return this._distanceInPixelForHeatMap;
  }

  get distanceForHeatMap(): number {
    return this._distanceForHeatMap;
  }

  set distance(value: number) {
    this._distance = value;
    this.distanceSubject.next(this.distance);
  }

  get distance(): number {
    return this._distance;
  }
}
