import { Injectable } from '@angular/core';
import { ModelsOfPropagation } from '../tx-settings-interface';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
   private txPower: number;
   private propagationModel: ModelsOfPropagation;
   private frequency: number;

  constructor() { }

  public setTxPower(txPower: number) {
    this.txPower = txPower;
 }
 public getTxPower(): number {
   return this.txPower;
 }
 public setFrequency(frequency: number) {
   this.frequency = frequency;
 }
 public getFrequency(): number {
   return this.frequency;
 }
 public setPropagationModel(propagationModel: ModelsOfPropagation) {
   this.propagationModel = propagationModel;
 }
 public getPropagationModel(): ModelsOfPropagation {
   return this.propagationModel;
 }

 public solveWaveLength(frequency: number): number {
    const waveLength = 300 / frequency;
    return Math.round(waveLength * 10) / 10;
 }
}
