import {Injectable} from '@angular/core';
import {DistanceService} from '../distance-algorithm/distanceService';
import {TypesOfWalls} from './types-of-walls.enum';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  constructor(private distanceService: DistanceService) {
  }

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private numberOfWalls;
  private blackPixel = 0;
  private distanceWallslist: number[] = [];
  private lengthBlackPixel = 0;
  private _typesOfWalls: TypesOfWalls [] = [];
  private _distanceWallslistForCurrentPixel: number[] = [];
  private _typesOfWallsForCurrentPixel: TypesOfWalls[] = [];
  url: string;

  get typesOfWalls(): TypesOfWalls [] {
    return this._typesOfWalls;
  }
  get distanceWallslistForCurrentPixel(): number[] {
    return this._distanceWallslistForCurrentPixel;
  }

  get typesOfWallsForCurrentPixel(): TypesOfWalls[] {
    return this._typesOfWallsForCurrentPixel;
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

  drawHotelMap() {
    this.canvas = <HTMLCanvasElement>document.getElementById('hotelMap');
    this.context = this.canvas.getContext('2d');
    const hotelMapImage = new Image();
    hotelMapImage.src = './assets/images/black_hotel.png';
    hotelMapImage.onload = () => {
      this.context.drawImage(hotelMapImage, 0, 0);
    };
  }
  onSelectFile(event: any) {
    this.canvas = <HTMLCanvasElement>document.getElementById('hotelMap');
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context = this.canvas.getContext('2d');
    const reader = new FileReader();
    reader.onload = (readerEvent: any) => {
      const image = new Image();
      image.onload = () => {
        this.context.drawImage(image, 0, 0);
      };
      image.src =readerEvent.target.result;
    };
    reader.readAsDataURL(event.target.files[0]);
  }
  solveEquation(x1: number, y1: number, x2: number, y2: number) {
    this._typesOfWalls = [];
    this.setNumberOfWalls(0);
    const a = (y2 - y1) / (x2 - x1); // y=ax+b
    const angle = Math.atan(a);
    const b = y1 - a * x1;
    const distanceInPixel = this.distanceService.getDistanceInPixel();
    this.canvas = <HTMLCanvasElement>document.getElementById('hotelMap');
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
    if (x2 > x1 && y1 === y2) {
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
            this.distanceWallslist.push(Math.round(this.distanceService.distance * 10) / 10);
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
            this.distanceWallslist.push(Math.round(this.distanceService.distance * 10) / 10);
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
            this.distanceWallslist.push(Math.round(this.distanceService.distance * 10) / 10);
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
            this.distanceWallslist.push(Math.round(this.distanceService.distance * 10) / 10);
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
            this.distanceWallslist.push(Math.round(this.distanceService.distance * 10) / 10);
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
            this.distanceWallslist.push(Math.round(this.distanceService.distance * 10) / 10);
          }
          parameterT += 1 / distanceInPixel;
        }
        break;
    }
  }

  getPixelColor(cordinateX: number, cordinateY: number) {
    return this.context.getImageData(cordinateX, cordinateY, 1, 1).data;
  }

  checkPixel(pixel: Uint8ClampedArray) {
    if (pixel[3] === 255) {
      ++this.blackPixel;
    } else if ((pixel[3] !== 255) && (this.blackPixel > 0)) {
      this.lengthBlackPixel = this.blackPixel;
      ++this.numberOfWalls;
      this.setNumberOfWalls(this.numberOfWalls);
      this.blackPixel = 0;
      return true;
    }
    return false;
  }

  clearCanvas() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this._typesOfWalls.slice(0,this.typesOfWalls.length);
    this.distanceWallslist.slice(0,this.distanceWallslist.length);
    const canvas = <HTMLCanvasElement>document.getElementById("legend");
    const context = canvas.getContext("2d");
    context.clearRect(0,0,canvas.width, canvas.height);
  }


  solveEquationToCurrentPixel(x1: number, y1: number, x2: number, y2: number) {
    this._typesOfWallsForCurrentPixel = [];
    this.setNumberOfWalls(0);
    const a = (y2 - y1) / (x2 - x1); // y=ax+b
    const angle = Math.atan(a);
    const distanceInPixel = this.distanceService.distanceInPixelForHeatMap;
    this.canvas = <HTMLCanvasElement>document.getElementById('hotelMap');
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
    if (x2 > x1 && y1 === y2) {
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
          if (this.checkPixel(this.getPixelColor(x1 + parameterM * parameterT, y1 + parameterN * parameterT))) {
            const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
            if ((wallThickness > 0) && (wallThickness < 2)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.drywall);
            }
            if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.redBrick);
            }
            if (wallThickness > 3.75) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.cinderBlock);
            }
            this.lengthBlackPixel = 0;
          }
          parameterT += 1 / distanceInPixel;
        }
        break;
      case 2:
        for (let i = 0; i < distanceInPixel; i++) {
          if (this.checkPixel(this.getPixelColor(x1 - parameterM * parameterT, y1 - parameterN * parameterT))) {
            const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
            if ((wallThickness > 0) && (wallThickness < 2)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.drywall);
            }
            if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.redBrick);
            }
            if (wallThickness > 3.75) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.cinderBlock);
            }
            this.lengthBlackPixel = 0;
          }
          parameterT += 1 / distanceInPixel;
        }
        break;
      case 3:
        for (let i = 0; i < distanceInPixel; i++) {
          if (this.checkPixel(this.getPixelColor(x1, y1 + parameterN * parameterT))) {
            const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
            if ((wallThickness > 0) && (wallThickness < 2)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.drywall);
            }
            if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.redBrick);
            }
            if (wallThickness > 3.75) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.cinderBlock);
            }
            this.lengthBlackPixel = 0;
          }
          parameterT += 1 / distanceInPixel;
        }
        break;
      case 4:
        for (let i = 0; i < distanceInPixel; i++) {
          if (this.checkPixel(this.getPixelColor(x1, y1 - parameterN * parameterT))) {
            const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
            if ((wallThickness > 0) && (wallThickness < 2)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.drywall);
            }
            if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.redBrick);
            }
            if (wallThickness > 3.75) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.cinderBlock);
            }
            this.lengthBlackPixel = 0;
          }
          parameterT += 1 / distanceInPixel;
        }
        break;
      case 5:
        for (let i = 0; i < distanceInPixel; i++) {
          if (this.checkPixel(this.getPixelColor(x1 + parameterM * parameterT, y1))) {
            const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
            if ((wallThickness > 0) && (wallThickness < 2)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.drywall);
            }
            if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.redBrick);
            }
            if (wallThickness > 3.75) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.cinderBlock);
            }
            this.lengthBlackPixel = 0;
          }
          parameterT += 1 / distanceInPixel;
        }
        break;
      case 6:
        for (let i = 0; i < distanceInPixel; i++) {
          if (this.checkPixel(this.getPixelColor(x1 - parameterM * parameterT, y1))) {
            const wallThickness: number = Math.cos(angle) * this.lengthBlackPixel;
            if ((wallThickness > 0) && (wallThickness < 2)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.drywall);
            }
            if ((wallThickness >= 2) && (wallThickness <= 3.75)) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.redBrick);
            }
            if (wallThickness > 3.75) {
              this._typesOfWallsForCurrentPixel.push(TypesOfWalls.cinderBlock);
            }
            this.lengthBlackPixel = 0;
          }
          parameterT += 1 / distanceInPixel;
        }
        break;
    }
  }
  addGradientLegend() {
  const canvas = <HTMLCanvasElement>document.getElementById("legend");
  const context = canvas.getContext("2d");
  let offsets: number [] = [];
  let stepForOffset = 1/35;
  for (let i = 0; i<35; i++) {
    offsets[i] = stepForOffset;
    stepForOffset +=1/35;
  }
  let legendGradient = context.createLinearGradient(0,0,0,170);
    legendGradient.addColorStop(offsets[0],'rgb(240,0,0)');
    legendGradient.addColorStop(offsets[1],'rgb(240,40,0)');
    legendGradient.addColorStop(offsets[2],'rgb(240,48,0)');
    legendGradient.addColorStop(offsets[3],'rgb(240,60,0)');
    legendGradient.addColorStop(offsets[4],'rgb(240,80,0)');
    legendGradient.addColorStop(offsets[5],'rgb(240,100,0)');
    legendGradient.addColorStop(offsets[6],'rgb(240,112,0)');
    legendGradient.addColorStop(offsets[7],'rgb(240,120,0)');
    legendGradient.addColorStop(offsets[8],'rgb(240,132,0)');
    legendGradient.addColorStop(offsets[9],'rgb(240,140,0)');
    legendGradient.addColorStop(offsets[10],'rgb(240,148,0)');
    legendGradient.addColorStop(offsets[11],'rgb(240,160,0)');
    legendGradient.addColorStop(offsets[12],'rgb(240,168,0)');
    legendGradient.addColorStop(offsets[13],'rgb(240,184,0)');
    legendGradient.addColorStop(offsets[14],'rgb(240,192,0)');
    legendGradient.addColorStop(offsets[15],'rgb(240,200,0)');
    legendGradient.addColorStop(offsets[16],'rgb(240,208,0)');
    legendGradient.addColorStop(offsets[17],'rgb(240,216,0)');
    legendGradient.addColorStop(offsets[18],'rgb(240,224,0)');
    legendGradient.addColorStop(offsets[19],'rgb(240,240,0)');
    legendGradient.addColorStop(offsets[20],'rgb(220,240,0)');
    legendGradient.addColorStop(offsets[21],'rgb(208,240,0)');
    legendGradient.addColorStop(offsets[22],'rgb(192,240,0)');
    legendGradient.addColorStop(offsets[23],'rgb(180,240,0)');
    legendGradient.addColorStop(offsets[24],'rgb(160,240,0)');
    legendGradient.addColorStop(offsets[25],'rgb(140,240,0)');
    legendGradient.addColorStop(offsets[26],'rgb(120,240,0)');
    legendGradient.addColorStop(offsets[27],'rgb(100,240,0)');
    legendGradient.addColorStop(offsets[28],'rgb(20,240,0)');
    legendGradient.addColorStop(offsets[29],'rgb(0,240,80)');
    legendGradient.addColorStop(offsets[30],'rgb(0,240,200)');
    legendGradient.addColorStop(offsets[31],'rgb(0,240,220)');
    legendGradient.addColorStop(offsets[32],'rgb(0,120,240)');
    legendGradient.addColorStop(offsets[33],'rgb(0,40,240)');
    legendGradient.addColorStop(offsets[34],'rgb(32,0,240)');
    context.fillStyle = legendGradient;
    context.font = "12px Arial";
    context.fillText('9 [dBm]',55,10);
    context.fillRect(1, 1,50,170);
    context.fillText('-97 [dBm]',55,170);
  }
}
