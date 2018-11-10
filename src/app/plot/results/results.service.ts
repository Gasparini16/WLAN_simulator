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


    private solvePathLoss() {
      const currentModel: ModelsOfPropagation = this.txSettings.getPropagationModel();
      const distance: number = this.distance.getDistance();
      const walls: number[] = this. dataFromDraw.getListOfWalls();
      const wavelength: number = this.txSettings.solveWaveLength(this.txSettings.getFrequency());
      switch (currentModel) {
        case ModelsOfPropagation.kamerman:
          this.kamerman.solveEightMetterPathLoss(wavelength);
          this.kamerman.solveOneMetterPathLoss(wavelength);
          this.kamerman.solveKamerman(distance);
          break;
        case ModelsOfPropagation.oneSlope:
          this.oneSlope.solveOneMetterPathLoss(wavelength);
          this.oneSlope.solveOneSlope(distance);
          break;
        case ModelsOfPropagation.motleyKeenan:
          this.motleyKeenan.solveMotleyKeenan(distance, wavelength, walls);
          break;
      }
    }
    private getArrayOfPathLoss(): number[] {
      const currentModel: ModelsOfPropagation = this.txSettings.getPropagationModel();
      switch (currentModel) {
        case ModelsOfPropagation.kamerman:
          return this.kamerman.getKamermanPathLoss();
        case ModelsOfPropagation.oneSlope:
          return this.oneSlope.getOneSlopePathLoss();
        case ModelsOfPropagation.motleyKeenan:
          return this.motleyKeenan.getMotleyKeenanPathLoss();
      }
    }
    private getArrayOfRealDistance(): number[] {
      const currentModel: ModelsOfPropagation = this.txSettings.getPropagationModel();
      switch (currentModel) {
        case ModelsOfPropagation.kamerman:
          return this.kamerman.getKamermanRealDistanceArray();
        case ModelsOfPropagation.oneSlope:
          return this.oneSlope.getOneSlopeRealDistanceArray();
        case ModelsOfPropagation.motleyKeenan:
          return this.motleyKeenan.getMotleyKeenanRealDistanceArray();
      }
    }
}
