import {Injectable} from '@angular/core';
import {DistanceService} from 'src/app/indoor-map/distance-algorithm/distanceService';
import {Kamerman} from 'src/app/propagation-models/kamerman';
import {OneSlope} from 'src/app/propagation-models/one-slope';
import {SettingsService} from 'src/app/tx-settings/settings-service/settings.service';
import {ModelsOfPropagation} from 'src/app/tx-settings/tx-settings-interface';
import {DrawService} from 'src/app/indoor-map/hotelMap/drawService';
import {saveAs} from 'file-saver';
import {TypesOfWalls} from 'src/app/indoor-map/hotelMap/types-of-walls.enum';
import {MultiWall} from 'src/app/propagation-models/multi-wall';

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
    private dataFromDraw: DrawService) {
  }

  private _pathLoss: number[] = [];
  private _distanceArray: number[] = [];

  get propModel(): ModelsOfPropagation {
    return this.txSettings.getPropagationModel();
  }

  get distanceArray(): number[] {
    return this._distanceArray;
  }

  get pathLoss(): number[] {
    return this._pathLoss;
  }

  set pathLoss(value: number[]) {
    this._pathLoss = value;
  }

  set distanceArray(value: number[]) {
    this._distanceArray = value;
  }

  solvePathLossPropagationModel() {
    const currentModel: ModelsOfPropagation = this.txSettings.getPropagationModel();
    const distance: number = this.distance.distance;
    const walls: number[] = this.dataFromDraw.getListOfWalls();
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
          this.pathLoss[i] = this.oneSlope.oneSlopePathLossArray[i];
          this.distanceArray[i] = this.oneSlope.realDistanceArray[i];
        }
        break;
      case ModelsOfPropagation.kamerman:
        this.kamerman.solveOneMeterPathLoss(wavelength);
        this.kamerman.solveEightMeterPathLoss(wavelength);
        this.kamerman.solveKamerman(distance, power);
        for (let i = 0; i < this.kamerman.realDistance.length; i++) {
          this.pathLoss[i] = this.kamerman.kamermanPathLoss[i];
          this.distanceArray[i] = this.kamerman.realDistance[i];
        }
        this.kamerman.solveOnSpecialDistance(distance, power);
        break;
      case ModelsOfPropagation.multiWall:
        this.multiWall.solveMultiWall(distance, wavelength, walls, power, typesOfWalls, frequency);
        console.log(walls);
        for (let i = 0; i < this.multiWall.realDistance.length; i++) {
          this.pathLoss[i] = this.multiWall.multiWallPathLoss[i];
          this.distanceArray[i] = this.multiWall.realDistance[i];
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

  clearAllResults() {
    this.distance.distance = 0;
    console.log(this.distance.distance);
    this.dataFromDraw.clearCanvas();
    this.dataFromDraw.drawHotelMap();
     this.pathLoss = [];
     this.distanceArray = [];
    const currentModel: ModelsOfPropagation = this.txSettings.getPropagationModel();
    switch (currentModel) {
      case ModelsOfPropagation.oneSlope:
        this.oneSlope.clearResultsArrays();
        break;
      case ModelsOfPropagation.kamerman:
        this.kamerman.clearResultsArrays();
        break;
      case ModelsOfPropagation.multiWall:
        this.multiWall.clearResultsArrays();
        break;
    }
  }

}
