import { Injectable, SystemJsNgModuleLoader } from '@angular/core';
import { DistanceService } from 'src/app/indoor-map/distance-algorithm/distanceService';
import { Kamerman } from 'src/app/propagation-models/kamerman';
import { OneSlope } from 'src/app/propagation-models/one-slope';
import { SettingsService } from 'src/app/tx-settings/settings-service/settings.service';
import { ModelsOfPropagation } from 'src/app/tx-settings/tx-settings-interface';
import { DrawService } from 'src/app/indoor-map/hotelMap/drawService';
import { saveAs} from 'file-saver';
import { TypesOfWalls } from 'src/app/indoor-map/hotelMap/types-of-walls.enum';
import { MultiWall } from 'src/app/propagation-models/multi-wall';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  constructor(
    private distance: DistanceService,
    private kamerman: Kamerman,
    private oneSlope: OneSlope,
    private multiWall: MultiWall,
    private txSettings: SettingsService,
    private dataFromDraw: DrawService) { }

    private _pathLoss: number[] = [];
    private _distanceArray: number[] = [];
    private _propModel: ModelsOfPropagation;
    fileUrl;
     get propModel(): ModelsOfPropagation {
       return this.txSettings.getPropagationModel();
     }
    get distanceArray(): number[] {
      return this._distanceArray;
    }
    get pathLoss(): number[] {
      return this._pathLoss;
    }
    solvePathLossPropagationModel() {
      const currentModel: ModelsOfPropagation = this.txSettings.getPropagationModel();
      const distance: number = this.distance.getDistance();
      const walls: number[] = this. dataFromDraw.getListOfWalls();
      const wavelength: number = this.txSettings.solveWaveLength(this.txSettings.getFrequency());
      const power: number = this.txSettings.getTxPower();
      const frequency: number = this.txSettings.getFrequency();
      const typesOfWalls: TypesOfWalls[] = this.dataFromDraw.typesOfWalls;
      const periodOfDistance: number = distance / 0.5;
      Math.round(periodOfDistance);
      switch (currentModel) {
        case ModelsOfPropagation.oneSlope:
          this.oneSlope.solveOneMetterPathLoss(wavelength);
          this.oneSlope.solveOneSlope(distance, power);
          for (let i = 0; i < this.oneSlope.realDistanceArray.length; i++) {
          this._pathLoss[i] = this.oneSlope.oneSlopePathLossArray[i];
          this._distanceArray[i] = this.oneSlope.realDistanceArray[i];
          }
        break;
        case ModelsOfPropagation.kamerman:
          this.kamerman.solveOneMetterPathLoss(wavelength);
          this.kamerman.solveEightMetterPathLoss(wavelength);
            this.kamerman.solveKamerman(distance, power);
            for (let i = 0; i < this.kamerman.realDistance.length; i++) {
              this._pathLoss[i] = this.kamerman.kamermanPathLoss[i];
              this._distanceArray[i] = this.kamerman.realDistance[i];
              }
        break;
        case ModelsOfPropagation.multiWall:
        this.multiWall.solveMultiWall(distance, wavelength, walls, power, typesOfWalls, frequency);
        console.log(walls);
        for (let i = 0; i < this.multiWall.realDistance.length; i++) {
          this._pathLoss[i] = this.multiWall.multiWallPathLoss[i];
          this._distanceArray[i] = this.multiWall.realDistance[i];
          }
        break;
      }
    }

    saveToFileSystem() {
      let data = '';
     data += (this.txSettings.getPropagationModel().toString() + '\r\n');
     data += ('Distance [m]' + '\  ' + 'Power level [dBm]' + '\r\n');
      for (let i = 0; i < this.distanceArray.length; i++) {
         data += (this._distanceArray[i].toString() + '\              ' + this._pathLoss[i].toString() + '\r\n');
      }
      const blob = new Blob([data], {type: 'text/plain'});
      saveAs(blob, 'propResults.txt');
    }

}
