import {Injectable} from '@angular/core';
import {TypesOfWalls} from '../indoor-map/hotelMap/types-of-walls.enum';

@Injectable({
  providedIn: 'root'
})
export class MultiWall {
  constructor() {
  }

  private _realDistance: number [] = [];
  private _multiWallPathLoss: number [] = [];


  public solveMultiWall(distance: number, wavelength: number, distanceWallsList: number[], txPower: number,
                        typesOfWalls: TypesOfWalls[], frequency: number) {
    let wallsAttenuationArray: number [] = [];
    if ((frequency > 2400) && (frequency < 5000)) {
      wallsAttenuationArray = [0.5, 4.5, 6.7];
    }
    if (frequency > 5000) {
      wallsAttenuationArray = [0.5, 14.6, 10.3];
    }
    let isWallsListNotEmpty = false;
    let pathLoss: number;
    let drywallCounter = 0;
    let redBrickCounter = 0;
    let cinderBlockCounter = 0;
    let periodOfDistance = distance / 0.5;
    if ((periodOfDistance % 1) <= 0.5) {
      periodOfDistance = Math.round(periodOfDistance) + 1;
    } else if ((periodOfDistance % 1) > 0.5) {
      periodOfDistance = Math.round(periodOfDistance);
    }
    this.realDistance[0] = 0;
    this.multiWallPathLoss[0] = txPower;
    if (distanceWallsList.length > 0) {
      isWallsListNotEmpty = true;
    }
    switch (isWallsListNotEmpty) {
      case false:
        for (let i = 1; i <= periodOfDistance; i++) {
          pathLoss = txPower - (20 * Math.log10((4 * Math.PI * i * 0.5) / wavelength));
          this.multiWallPathLoss[i] = Math.round(pathLoss * 10) / 10;
          this.realDistance [i] = i * 0.5;
        }
        break;
      case true:
        for (let i = 1; i <= periodOfDistance; i++) {
          for (let j = 0; j < distanceWallsList.length; j++) {
            if (((i * 0.5) <= distanceWallsList[j]) && ((i * 0.5 + 0.5) >= distanceWallsList[j])) {
              const sumCounter: number = drywallCounter + redBrickCounter + cinderBlockCounter;
              if (sumCounter < typesOfWalls.length) {
                const typeOfWall: string = typesOfWalls[j];
                console.log(typeOfWall);
                switch (typeOfWall) {
                  case 'DRYWALL':
                    ++drywallCounter;
                    break;
                  case'RED-BRICK':
                    ++redBrickCounter;
                    break;
                  case 'CINDER-BLOCK':
                    ++cinderBlockCounter;
                    break;
                }
              }
            }
          }
          console.log(drywallCounter + ' ' + redBrickCounter + ' ' + cinderBlockCounter);
          pathLoss = txPower - (20 * Math.log10((4 * Math.PI * i * 0.5) / wavelength) + (drywallCounter * wallsAttenuationArray[0]
            + redBrickCounter * wallsAttenuationArray[1] + cinderBlockCounter * wallsAttenuationArray[2]));
          this.multiWallPathLoss[i] = Math.round(pathLoss * 10) / 10;
          this.realDistance [i] = i * 0.5;
        }
        break;
    }
  }

  get multiWallPathLoss(): number [] {
    return this._multiWallPathLoss;
  }

  get realDistance(): number [] {
    return this._realDistance;
  }

  set multiWallPathLoss(value: number[]) {
    this._multiWallPathLoss = value;
  }

  set realDistance(value: number[]) {
    this._realDistance = value;
  }

  public clearResultsArrays() {
    this.multiWallPathLoss = [];
    this.realDistance = [];
  }

  public solveOnSpecialDistance(distance: number, txPower: number, typesOfWalls: TypesOfWalls[], frequency: number, wavelength: number) {
    let wallsAttenuationArray: number [] = [];
    if ((frequency > 2400) && (frequency < 5000)) {
      wallsAttenuationArray = [0.5, 4.5, 6.7];
    }
    if (frequency > 5000) {
      wallsAttenuationArray = [0.5, 14.6, 10.3];
    }
    let isWallsListNotEmpty = false;
    let drywallCounter = 0;
    let redBrickCounter = 0;
    let cinderBlockCounter = 0;
    if (typesOfWalls.length > 0) {
      isWallsListNotEmpty = true;
    }
    switch (isWallsListNotEmpty) {
      case false:
        return (txPower - (20 * Math.log10((4 * Math.PI * distance) / wavelength)));
      case true:
        for (let i = 1; i <= typesOfWalls.length; i++) {
          const sumCounter: number = drywallCounter + redBrickCounter + cinderBlockCounter;
          if (sumCounter < typesOfWalls.length) {
            const typeOfWall: string = typesOfWalls[i];
            console.log(typeOfWall);
            switch (typeOfWall) {
              case 'DRYWALL':
                ++drywallCounter;
                break;
              case'RED-BRICK':
                ++redBrickCounter;
                break;
              case 'CINDER-BLOCK':
                ++cinderBlockCounter;
                break;
            }
          }
        }
        return (txPower - (20 * Math.log10((4 * Math.PI * distance) / wavelength) + (drywallCounter * wallsAttenuationArray[0]
          + redBrickCounter * wallsAttenuationArray[1] + cinderBlockCounter * wallsAttenuationArray[2])));
    }
  }
}
