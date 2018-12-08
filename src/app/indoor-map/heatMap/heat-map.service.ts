import {Injectable} from '@angular/core';
import {ResultsService} from 'src/app/plot/results/results.service';
import {DistanceService} from "../distance-algorithm/distanceService";
import {ModelsOfPropagation} from "../../tx-settings/tx-settings-interface";
import {SettingsService} from "../../tx-settings/settings-service/settings.service";
import {OneSlope} from "../../propagation-models/one-slope";
import {Kamerman} from "../../propagation-models/kamerman";
import {MultiWall} from "../../propagation-models/multi-wall";
import {ColorService} from "./colors/color.service";
import {TypesOfWalls} from "../hotelMap/types-of-walls.enum";
import {DrawService} from "../hotelMap/drawService";

@Injectable({
  providedIn: 'root'
})
export class HeatMapService {
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  constructor(
    results: ResultsService,
    private distanceService: DistanceService,
    private txSettings: SettingsService,
    private oneSlope: OneSlope,
    private kamerman: Kamerman,
    private multiWall: MultiWall,
    private color: ColorService,
    private dataFromDraw: DrawService
  ) {
  }


  putColorOnPixel() {
    this.canvas = <HTMLCanvasElement>document.getElementById('hotelMap');
    this.context = this.canvas.getContext('2d');
    const frequency: number = this.txSettings.getFrequency();
    const wavelength: number = this.txSettings.solveWaveLength(this.txSettings.getFrequency());
    const xTransmitter: number = this.distanceService.coordinateXTransceiver;
    const yTransmitter: number = this.distanceService.coordinateYTransceiver;
    const currentModel: ModelsOfPropagation = this.txSettings.getPropagationModel();
    const txPower: number = this.txSettings.getTxPower();
    switch (currentModel) {
      case ModelsOfPropagation.oneSlope:
        for (let i = 0; i < this.canvas.width; i++) {
          for (let j = 0; j < this.canvas.height; j++) {
            let powerAtPoint = 0;
            let distance = 0;
            this.oneSlope.solveOneMeterPathLoss(wavelength);
            this.distanceService.solveDistanceForHeatMap(xTransmitter,yTransmitter,i,j);
            distance = this.distanceService.distanceForHeatMap;
            this.oneSlope.solveOnSpecialDistance(distance, txPower);
            powerAtPoint = this.oneSlope.solveOnSpecialDistance(distance, txPower);
            this.color.setColorToDraw(powerAtPoint);
            const r: string = this.color.redColor.toString();
            const g: string = this.color.greenColor.toString();
            const b: string = this.color.blueColor.toString();
            this.context.fillRect(i, j, 1, 1);
             this.context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.9)';
          }
        }
        break;
      case ModelsOfPropagation.kamerman:
        for (let i = 0; i < this.canvas.width; i++) {
          for (let j = 0; j < this.canvas.height; j++) {
            let powerAtPoint = 0;
            let distance = 0;
            this.distanceService.solveDistanceForHeatMap(xTransmitter,yTransmitter,i,j);
            distance = this.distanceService.distanceForHeatMap;
            this.kamerman.solveOneMeterPathLoss(wavelength);
            this.kamerman.solveEightMeterPathLoss(wavelength);
            powerAtPoint = this.kamerman.solveOnSpecialDistance(distance, txPower);
            this.color.setColorToDraw(powerAtPoint);
            const r: string = this.color.redColor.toString();
            const g: string = this.color.greenColor.toString();
            const b: string = this.color.blueColor.toString();
            this.context.fillRect(i, j, 1, 1);
            this.context.fillStyle = 'rgba(' + this.color.redColor + ',' + this.color.greenColor + ',' + this.color.blueColor + ',0.9)';
          }
        }
        break;
      case ModelsOfPropagation.multiWall:
        for (let i = 0; i < this.canvas.width; i+=10){
          for (let j = 0; j < this.canvas.height; j+=10) {
            const typesOfWalls: TypesOfWalls[] = this.dataFromDraw.typesOfWallsForCurrentPixel;
            let powerAtPoint = 0;
            let distance = 0;
            this.distanceService.solveDistanceForHeatMap(xTransmitter,yTransmitter,i,j);
            distance = this.distanceService.distanceForHeatMap;
            this.dataFromDraw.solveEquationToCurrentPixel(xTransmitter,yTransmitter,i,j);
            powerAtPoint = this.multiWall.solveOnSpecialDistance(distance, txPower, typesOfWalls, frequency, wavelength);
            this.color.setColorToDraw(powerAtPoint);
            const r: string = this.color.redColor.toString();
            const g: string = this.color.greenColor.toString();
            const b: string = this.color.blueColor.toString();
            this.context.fillRect(i, j, 10, 10);
            this.context.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',0.9)';
          }
        }
        break;
    }
  }
}
