import {Injectable} from '@angular/core';
import { angularMath } from 'angular-ts-math';
import { DistanceService } from '../distance-algorithm/distanceService';
import { TypesOfWalls } from './types-of-walls.enum';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
    constructor (private distanceService: DistanceService) {}
private  canvas: HTMLCanvasElement;
private  context: CanvasRenderingContext2D;
private numberOfWalls;
private blackPixel = 0;
private distanceWallslist: number[] = [];
private lengthBlackPixel = 0;

private readonly wallAttenuationsFor2_4GHz: number [] = [0.5, 4.5, 6.7];
private readonly wallAttenuationsFor5Ghz: number [] = [0.5, 14.6, 10.3];
 private _typesOfWalls: TypesOfWalls [] = [];

 get typesOfWalls(): TypesOfWalls [] {
   return this._typesOfWalls;
 }


  drawHotelMap() {
    this.canvas = <HTMLCanvasElement> document.getElementById('hotelMap');
    this.context = this.canvas.getContext('2d');
    const hotelMapImage = new Image();
    hotelMapImage.src = './assets/images/black_hotel.png';
    hotelMapImage.onload = () => {
      this.context.drawImage(hotelMapImage, 0, 0);
    };
  }
  solveEquation(x1: number, y1: number, x2: number, y2: number) {
    this._typesOfWalls = [];
    this.setNumberOfWalls(0);
    const a = (y2 - y1) / (x2 - x1); // y=ax+b
    const angle = Math.atan(a);
    const b = y1 - a * x1;
    const distanceInPixel = this.distanceService.getDistanceInPixel();
    this.canvas = <HTMLCanvasElement> document.getElementById('hotelMap');
    this.context = this.canvas.getContext('2d');
    let check: number;
    let parameterT: number;
    let parameterM: number;
    let parameterN: number;
    if (x2 > x1 && y1 !== y2) {
      parameterT = 1 / distanceInPixel;
      parameterM = x2 - x1;
      parameterN = y2 - y1;
      check = 1;
    }
    if (x1 > x2 && y1 !== y2) {
      parameterT = 1 / distanceInPixel;
       parameterM = x1 - x2;
       parameterN = y1 - y2;
      check = 2;
    }
    if (y2 > y1 && x1 === x2) {
      parameterT = 1 / distanceInPixel;
      parameterM = x2 - x1;
      parameterN = y2 - y1;
      check = 3;
    }
    if (y1 > y2 && x1 === x2) {
      parameterT = 1 / distanceInPixel;
      parameterM = x2 - x1;
      parameterN = y1 - y2;
      check = 4;
    }
    if ( x2 > x1 && y1 === y2) {
      parameterT = 1 / distanceInPixel;
      parameterM = x2 - x1;
      parameterN = y2 - y1;
      check = 5;
    }
    if (x1 > x2 && y1 === y2) {
      parameterT = 1 / distanceInPixel;
      parameterM = x1 - x2;
      parameterN = y2 - y1;
      check = 6;
    }
    switch (check) {
      case 1:
        for (let i = 0; i < distanceInPixel; i++) {
          this.context.fillRect(x1 + parameterM * parameterT, y1 + parameterN * parameterT, 1, 1);
          this.context.fillStyle = 'red';
          if (this.checkPixel(this.getPixelColor(x1 + parameterM * parameterT, y1 + parameterN * parameterT))) {
            this.distanceService.solveDistance(x1, y1, x1 + parameterM * parameterT, y1 + parameterN * parameterT);
            const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
            if ((wallThickness > 0) && (wallThickness < 2)) {
              this._typesOfWalls.push(TypesOfWalls.drywall);
            }
            if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
              this._typesOfWalls.push(TypesOfWalls.redBrick);
            }
            if (wallThickness > 3.75) {
              this._typesOfWalls.push(TypesOfWalls.cinderBlock);
            }
            this.lengthBlackPixel = 0;
            this.distanceWallslist.push(Math.round(this.distanceService.getDistance() * 10) / 10);
          }
          parameterT += 1 / distanceInPixel;
        }
        break;
      case 2:
      for (let i = 0; i < distanceInPixel; i++) {
        this.context.fillRect(x1 - parameterM * parameterT, y1 - parameterN * parameterT, 1, 1);
        this.context.fillStyle = 'red';
        if (this.checkPixel(this.getPixelColor(x1 - parameterM * parameterT, y1 - parameterN * parameterT))) {
          this.distanceService.solveDistance(x1, y1, x1 - parameterM * parameterT, y1 - parameterN * parameterT);
          const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
          if ((wallThickness > 0) && (wallThickness < 2)) {
            this._typesOfWalls.push(TypesOfWalls.drywall);
          }
          if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
            this._typesOfWalls.push(TypesOfWalls.redBrick);
          }
          if (wallThickness > 3.75) {
            this._typesOfWalls.push(TypesOfWalls.cinderBlock);
          }
          this.lengthBlackPixel = 0;
          this.distanceWallslist.push(Math.round(this.distanceService.getDistance() * 10) / 10);
        }
        parameterT += 1 / distanceInPixel;
      }
      break;
      case 3:
      for (let i = 0; i < distanceInPixel; i++) {
        this.context.fillRect(x1, y1 + parameterN * parameterT, 1, 1);
        this.context.fillStyle = 'red';
        if (this.checkPixel(this.getPixelColor(x1, y1 + parameterN * parameterT))) {
          this.distanceService.solveDistance(x1, y1, x1, y1 + parameterN * parameterT);
          const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
          if ((wallThickness > 0) && (wallThickness < 2)) {
            this._typesOfWalls.push(TypesOfWalls.drywall);
          }
          if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
            this._typesOfWalls.push(TypesOfWalls.redBrick);
          }
          if (wallThickness > 3.75) {
            this._typesOfWalls.push(TypesOfWalls.cinderBlock);
          }
          this.lengthBlackPixel = 0;
          this.distanceWallslist.push(Math.round(this.distanceService.getDistance() * 10) / 10);
        }
        parameterT += 1 / distanceInPixel;
      }
      break;
      case 4:
      for (let i = 0; i < distanceInPixel; i++) {
        this.context.fillRect(x1, y1 - parameterN * parameterT, 1, 1);
        this.context.fillStyle = 'red';
        if (this.checkPixel(this.getPixelColor(x1, y1 - parameterN * parameterT))) {
          this.distanceService.solveDistance(x1, y1, x1, y1 - parameterN * parameterT);
          const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
          if ((wallThickness > 0) && (wallThickness < 2)) {
            this._typesOfWalls.push(TypesOfWalls.drywall);
          }
          if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
            this._typesOfWalls.push(TypesOfWalls.redBrick);
          }
          if (wallThickness > 3.75) {
            this._typesOfWalls.push(TypesOfWalls.cinderBlock);
          }
          this.lengthBlackPixel = 0;
          this.distanceWallslist.push(Math.round(this.distanceService.getDistance() * 10) / 10);
        }
        parameterT += 1 / distanceInPixel;
      }
      break;
      case 5:
      for (let i = 0; i < distanceInPixel; i++) {
        this.context.fillRect(x1 + parameterM * parameterT, y1, 1, 1);
        this.context.fillStyle = 'red';
        if (this.checkPixel(this.getPixelColor(x1 + parameterM * parameterT, y1))) {
          this.distanceService.solveDistance(x1, y1, x1 + parameterM * parameterT, y1);
          const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
            if ((wallThickness > 0) && (wallThickness < 2)) {
              this._typesOfWalls.push(TypesOfWalls.drywall);
            }
            if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
              this._typesOfWalls.push(TypesOfWalls.redBrick);
            }
            if (wallThickness > 3.75) {
              this._typesOfWalls.push(TypesOfWalls.cinderBlock);
            }
            this.lengthBlackPixel = 0;
          this.distanceWallslist.push(Math.round(this.distanceService.getDistance() * 10) / 10);
        }
        parameterT += 1 / distanceInPixel;
      }
      break;
      case 6:
      for (let i = 0; i < distanceInPixel; i++) {
        this.context.fillRect(x1 - parameterM * parameterT, y1, 1, 1);
        this.context.fillStyle = 'red';
        if (this.checkPixel(this.getPixelColor(x1 - parameterM * parameterT, y1))) {
          this.distanceService.solveDistance(x1, y1, x1 - parameterM * parameterT, y1);
          const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
          if ((wallThickness > 0) && (wallThickness < 2)) {
            this._typesOfWalls.push(TypesOfWalls.drywall);
          }
          if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
            this._typesOfWalls.push(TypesOfWalls.redBrick);
          }
          if (wallThickness > 3.75) {
            this._typesOfWalls.push(TypesOfWalls.cinderBlock);
          }
          this.lengthBlackPixel = 0;
          this.distanceWallslist.push(Math.round(this.distanceService.getDistance() * 10) / 10);
        }
        parameterT += 1 / distanceInPixel;
      }
      break;
    }
  }
  getPixelColor(cordinateX: number, cordinateY: number) {
    const pixel = this.context.getImageData(cordinateX, cordinateY, 1, 1).data;
    return pixel;
  }
  checkPixel(pixel: Uint8ClampedArray) {
    let checkBlackPixel = false;
    if (pixel[3] === 255) {
      ++this.blackPixel;
      checkBlackPixel = true;
    } else if ((pixel[3] !== 255) && (this.blackPixel > 0)) {
      this.lengthBlackPixel = this.blackPixel;
      ++this.numberOfWalls;
      this.setNumberOfWalls(this.numberOfWalls);
      this.blackPixel = 0;
      checkBlackPixel = false;
      return true;
    }
    return false;
  }
  setNumberOfWalls(numberOfWalls: number) {
    this.numberOfWalls = numberOfWalls;
  }
  getNumberOfWalls(): number {
    return this.numberOfWalls;
  }
  public getListOfWalls(): number[] {
    return this.distanceWallslist;
  }

}
