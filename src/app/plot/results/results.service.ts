import { Injectable } from '@angular/core';
import { DistanceService } from 'src/app/indoor-map/distance-algorithm/distanceService';
import { Kamerman } from 'src/app/propagation-models/kamerman';
import { OneSlope } from 'src/app/propagation-models/one-slope';
import { MotleyKeenan } from 'src/app/propagation-models/motley-keenan';
import { SettingsService } from 'src/app/tx-settings/settings-service/settings.service';
import { ModelsOfPropagation } from 'src/app/tx-settings/tx-settings-interface';
import { DrawService } from 'src/app/indoor-map/hotelMap/drawService';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  constructor(
    private distance: DistanceService,
    private kamerman: Kamerman,
    private oneSlope: OneSlope,
    private motleyKeenan: MotleyKeenan,
    private txSettings: SettingsService,
    private dataFromDraw: DrawService) { }

    private _pathLoss: number[] = [];
    private _distanceArray: number[] = [];
    private _propModel: ModelsOfPropagation;
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
        case ModelsOfPropagation.motleyKeenan:
        this.motleyKeenan.solveMotleyKeenan(distance, wavelength, walls, power);
        console.log(walls);
        for (let i = 0; i < this.motleyKeenan.realDistance.length; i++) {
          this._pathLoss[i] = this.motleyKeenan.motleyKeenanPathLoss[i];
          this._distanceArray[i] = this.motleyKeenan.realDistance[i];
          }
        break;
      }
    }

}
