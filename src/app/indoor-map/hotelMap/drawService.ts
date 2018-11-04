import { Injectable } from '@angular/core';
import { angularMath } from 'angular-ts-math';

@Injectable()
export class DrawService {
    constructor () {}
private  canvas: HTMLCanvasElement;
private  context: CanvasRenderingContext2D;
private numberOfWalls;
private blackPixel = 0;

  drawHotelMap() {
    this.canvas = <HTMLCanvasElement> document.getElementById('hotelMap');
    this.context = this.canvas.getContext('2d');
    const hotelMapImage = new Image();
    hotelMapImage.src = './img/black_hotel.png';
    hotelMapImage.onload = () => {
      this.context.drawImage(hotelMapImage, 0, 0);
    };
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
          this.checkPixel(this.getPixelColor(x1 + parameterM * parameterT, y1 + parameterN * parameterT));
          this.context.fillRect(x1 + parameterM * parameterT, y1 + parameterN * parameterT, 1, 1);
          this.context.fillStyle = 'red';
          parameterT += 1 / distance;
        }
        break;
      case 2:
      for (let i = 0; i < distance; i++) {
        this.checkPixel(this.getPixelColor(x1 - parameterM * parameterT, y1 - parameterN * parameterT));
        this.context.fillRect(x1 - parameterM * parameterT, y1 - parameterN * parameterT, 1, 1);
        this.context.fillStyle = 'red';
        parameterT += 1 / distance;
      }
      break;
      case 3:
      for (let i = 0; i < distance; i++) {
        this.checkPixel(this.getPixelColor(x1, y1 + parameterN * parameterT));
        this.context.fillRect(x1, y1 + parameterN * parameterT, 1, 1);
        this.context.fillStyle = 'red';
        parameterT += 1 / distance;
      }
      break;
      case 4:
      for (let i = 0; i < distance; i++) {
        this.checkPixel(this.getPixelColor(x1, y1 - parameterN * parameterT));
        this.context.fillRect(x1, y1 - parameterN * parameterT, 1, 1);
        this.context.fillStyle = 'red';
        parameterT += 1 / distance;
      }
      break;
      case 5:
      for (let i = 0; i < distance; i++) {
        this.checkPixel(this.getPixelColor(x1 + parameterM * parameterT, y1));
        this.context.fillRect(x1 + parameterM * parameterT, y1, 1, 1);
        this.context.fillStyle = 'red';
        parameterT += 1 / distance;
      }
      break;
      case 6:
      for (let i = 0; i < distance; i++) {
        this.checkPixel(this.getPixelColor(x1 - parameterM * parameterT, y1));
        this.context.fillRect(x1 - parameterM * parameterT, y1, 1, 1);
        this.context.fillStyle = 'red';
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
      this.blackPixel = 0;
      checkBlackPixel = false;
    }
    this.setNumberOfWalls(this.numberOfWalls);
  }
  setNumberOfWalls(numberOfWalls: number) {
    this.numberOfWalls = numberOfWalls;
  }
  getNumberOfWalls(): number {
    return this.numberOfWalls;
  }

}
