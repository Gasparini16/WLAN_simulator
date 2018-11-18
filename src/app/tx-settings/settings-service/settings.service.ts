import { Injectable } from '@angular/core';
import { ModelsOfPropagation, TxSetUp} from '../tx-settings-interface';
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService implements TxSetUp  {
  coordinateX: number;
  coordinateY: number;
  txPower: number;
  propagationModel: ModelsOfPropagation;
  frequency: number;
 private txPowersubscriber = new Subject<number>();
 private frequencySubscriber = new Subject<number>();
 private propModelSubscriber = new Subject<ModelsOfPropagation>();

    private transceivers: SettingsService[] = [];

  // constructor(eirp: number, frequency: number, propModel: ModelsOfPropagation) {
  //   this.txPower = eirp;
  //   this.frequency = frequency;
  //   this.propagationModel = propModel;
  //  }

  constructor() {}
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
  setCoordinateX(corX: number) {
    this.coordinateX = corX;
  }
  getCoordinateX(): number {
    return this.coordinateX;
  }
  setCoordinateY(corY: number) {
    this.coordinateY = corY;
  }
  getCoordinateY() {
    return this.coordinateY;
  }
 public addTransceiver(eirp: number, frequency: number, propModel: ModelsOfPropagation): void {
   const newTx = new SettingsService();
   newTx.setTxPower(eirp);
   newTx.setFrequency(frequency);
   newTx.setPropagationModel(propModel);
   this.transceivers.push(newTx);
 }

 public getTransceivers(): SettingsService[] {
   return this.transceivers;
 }

 public deleteAllTransceivers() {
   this.transceivers.splice(0, this.transceivers.length);
 }
}
