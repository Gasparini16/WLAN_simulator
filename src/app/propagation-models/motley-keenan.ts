import { Injectable } from '@angular/core';
import { angularMath } from 'angular-ts-math';
import { DistanceService } from '../indoor-map/distance-algorithm/distance';

@Injectable()
export class MotleyKeenan {
  constructor (private distanceInMeters: DistanceService) {}
  private realDistance: number [];
  private motleyKeenanPathLoss: number [];
  private wavelength: number;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private numberOfWalls;
  private blackPixel = 0;
  private distanceWallslist: number[];

  public solveMotleyKeenan(distance: number) {
    const periodOfDistance = distance / 0.5;
    let isWallsListNotEmpty = false;
    let pathLoss: number;
    Math.round(periodOfDistance);
    if (this.distanceWallslist.length > 0) {
      isWallsListNotEmpty = true;
    }
    for ( let i = 0; i < periodOfDistance; i++) {
      if (!isWallsListNotEmpty) {
      pathLoss = 20 * Math.log((4 * Math.PI * (i * 0.5)) / this.wavelength);
      this.motleyKeenanPathLoss[i] = Math.round(pathLoss * 10) / 10;
      this.realDistance[i] = i * 0.5;
      }
      if (isWallsListNotEmpty) {
          for (let j = 0; j < this.distanceWallslist.length; j++) {
            if ( ((i * 0.5) > this.distanceWallslist[j]) && (i * 0.5 - this.distanceWallslist[j]) < 0.5) {
              pathLoss = 20 * Math.log((4 * Math.PI * (i * 0.5)) / this.wavelength) + 3;
              this.motleyKeenanPathLoss[i] = Math.round(pathLoss * 10) / 10;
              this.realDistance[i] = i * 0.5;
            }
          }
      }
    }
  }

  solveEquation(x1: number, y1: number, x2: number, y2: number) {
    this.setNumberOfWalls(0);
    const a = (y2 - y1) / (x2 - x1); // y=ax+b
    const b = y1 - a * x1;
    const distance = angularMath.squareOfNumber(angularMath.powerOfNumber((x2 - x1), 2) +
    angularMath.powerOfNumber((y2 - y1) , 2));
    this.canvas = <HTMLCanvasElement> document.getElementById('hotelMap');
    this.context = this.canvas.getContext('2d');
    let check: number;
    let parameterT: number;
    let parameterM: number;
    let parameterN: number;
    if (x2 > x1 && y1 !== y2) {
      parameterT = 1 / distance;
      parameterM = x2 - x1;
      parameterN = y2 - y1;
      check = 1;
    }
    if (x1 > x2 && y1 !== y2) {
      parameterT = 1 / distance;
       parameterM = x1 - x2;
       parameterN = y1 - y2;
      check = 2;
    }
    if (y2 > y1 && x1 === x2) {
      parameterT = 1 / distance;
      parameterM = x2 - x1;
      parameterN = y2 - y1;
      check = 3;
    }
    if (y1 > y2 && x1 === x2) {
      parameterT = 1 / distance;
      parameterM = x2 - x1;
      parameterN = y1 - y2;
      check = 4;
    }
    if ( x2 > x1 && y1 === y2) {
      parameterT = 1 / distance;
      parameterM = x2 - x1;
      parameterN = y2 - y1;
      check = 5;
    }
    if (x1 > x2 && y1 === y2) {
      parameterT = 1 / distance;
      parameterM = x1 - x2;
      parameterN = y2 - y1;
      check = 6;
    }
    switch (check) {
      case 1:
        for (let i = 0; i < distance; i++) {
          if (this.checkPixel(this.getPixelColor(x1 + parameterM * parameterT, y1 + parameterN * parameterT))) {
            this.distanceInMeters.solveDistance(x1, y1, x1 + parameterM * parameterT, y1 + parameterN * parameterT);
            this.distanceWallslist.push(this.distanceInMeters.getDistance());
          }
          parameterT += 1 / distance;
        }
        break;
      case 2:
      for (let i = 0; i < distance; i++) {
        if (this.checkPixel(this.getPixelColor(x1 - parameterM * parameterT, y1 - parameterN * parameterT))) {
          this.distanceInMeters.solveDistance(x1, y1, x1 - parameterM * parameterT, y1 - parameterN * parameterT);
          this.distanceWallslist.push(this.distanceInMeters.getDistance());
        }
        parameterT += 1 / distance;
      }
      break;
      case 3:
      for (let i = 0; i < distance; i++) {
        if (this.checkPixel(this.getPixelColor(x1, y1 + parameterN * parameterT))) {
          this.distanceInMeters.solveDistance(x1, y1, x1, y1 + parameterN * parameterT);
          this.distanceWallslist.push(this.distanceInMeters.getDistance());
        }
        parameterT += 1 / distance;
      }
      break;
      case 4:
      for (let i = 0; i < distance; i++) {
        if (this.checkPixel(this.getPixelColor(x1, y1 - parameterN * parameterT))) {
          this.distanceInMeters.solveDistance(x1, y1, x1, y1 - parameterN * parameterT);
          this.distanceWallslist.push(this.distanceInMeters.getDistance());
        }
        parameterT += 1 / distance;
      }
      break;
      case 5:
      for (let i = 0; i < distance; i++) {
        if (this.checkPixel(this.getPixelColor(x1 + parameterM * parameterT, y1))) {
          this.distanceInMeters.solveDistance(x1, y1, x1 + parameterM * parameterT, y1);
          this.distanceWallslist.push(this.distanceInMeters.getDistance());
        }
        parameterT += 1 / distance;
      }
      break;
      case 6:
      for (let i = 0; i < distance; i++) {
        if (this.checkPixel(this.getPixelColor(x1 - parameterM * parameterT, y1))) {
          this.distanceInMeters.solveDistance(x1, y1, x1 - parameterM * parameterT, y1);
          this.distanceWallslist.push(this.distanceInMeters.getDistance());
        }
        parameterT += 1 / distance;
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

}
