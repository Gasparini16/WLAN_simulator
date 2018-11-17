import { Injectable } from '@angular/core';
import { ModelsOfPropagation} from '../tx-settings-interface';
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService  {
   private txPower: number;
   private propagationModel: ModelsOfPropagation;
   private frequency: number;
   private txPowersubscriber = new Subject<number>();
   private frequencySubscriber = new Subject<number>();
   private propModelSubscriber = new Subject<ModelsOfPropagation>();
   // private transceivers: SettingsService[] = [];

  // constructor(eirp: number, frequency: number, propModel: ModelsOfPropagation) {
  //   this.txPower = eirp;
  //   this.frequency = frequency;
  //   this.propagationModel = propModel;
  //  }

  constructor() {}
public setTxPower(txPower: number) {
    this.txPower = txPower;
    this.txPowersubscriber.next(this.txPower);
 }
 public getTxPower(): number {
   return this.txPower;
 }
 public setFrequency(frequency: number) {
   this.frequency = frequency;
   this.frequencySubscriber.next(this.txPower);
 }
 public getFrequency(): number {
  return this.frequency;
 }
 public setPropagationModel(propagationModel: ModelsOfPropagation) {
   this.propagationModel = propagationModel;
   this.propModelSubscriber.next(this.propagationModel);
 }
 public getPropagationModel(): ModelsOfPropagation {
   return this.propagationModel;
 }
 public solveWaveLength(frequency: number): number {
    const waveLength = 300 / frequency;
    return Math.round(waveLength * 10) / 10;
 }
//  public addTransceiver(eirp: number, frequency: number, propModel: ModelsOfPropagation): void {
//    const newTx = new SettingsService(eirp, frequency, propModel);
//    this.transceivers.push(newTx);
//  }
}
