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
  private _distanceForDrawingMap: number;
  private _distanceForCountingWalls: number;

  set distanceForCountingWalls(value: number) {
    this._distanceForCountingWalls = value;
  }
  get distanceForCountingWalls(): number {
    return this._distanceForCountingWalls;
  }

  set distanceForDrawingMap(value: number) {
    this._distanceForDrawingMap = value;
  }

  get distanceForDrawingMap(): number {
    return this._distanceForDrawingMap;
  }

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
    currentDistance = currentDistance * this.scale;
    currentDistance = currentDistance / 100;
    this.distance = currentDistance;
   // this.distanceSubject.next(this.distance);
   console.log(this.scale);
   console.log(currentDistance);
  }
  public solveDistanceForHeatMap(x1: number, y1: number, x2: number, y2: number){
    let currentDistance: number;
    currentDistance = Math.sqrt(Math.pow((x2 - x1), 2) +
      Math.pow((y2 - y1), 2));
    this._distanceInPixelForHeatMap = currentDistance;
    currentDistance = currentDistance / 38;
    currentDistance = currentDistance * this.scale;
    currentDistance = currentDistance / 100;
    this._distanceForHeatMap = currentDistance;
  }

  public solveDistanceForDrawingMap(x1: number, y1: number, x2: number, y2: number) {
    let currentDistance: number;
    currentDistance = Math.sqrt(Math.pow((x2 - x1), 2) +
      Math.pow((y2 - y1), 2));
    this.distanceInPixel = currentDistance;
    currentDistance = currentDistance / 38;
    currentDistance = currentDistance * this.scale;
    currentDistance = currentDistance / 100;
    this.distanceForDrawingMap = currentDistance;
  }
  public solveDistanceForCountingWalls(x1: number, y1: number, x2: number, y2: number) {
    let currentDistance: number;
    currentDistance = Math.sqrt(Math.pow((x2 - x1), 2) +
      Math.pow((y2 - y1), 2));
    this.distanceInPixel = currentDistance;
    currentDistance = currentDistance / 38;
    currentDistance = currentDistance * this.scale;
    currentDistance = currentDistance / 100;
    this.distanceForCountingWalls = currentDistance;
  }

  public getDistanceInPixel(): number {
    return this.distanceInPixel;
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
  //  this.distanceSubject.next(this.distance);
  }

  get distance(): number {
    return this._distance;
  }
}
