import { Injectable } from '@angular/core';
import { ModelsOfPropagation } from '../tx-settings-interface';
import { Subject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
   private txPower: number;
   private propagationModel: ModelsOfPropagation;
   private frequency: number;
   private txPowersubscriber = new Subject<number>();
   private frequencySubscriber = new Subject<number>();
   private propModelSubscriber = new Subject<ModelsOfPropagation>();

  constructor() { }

public setTxPower(txPower: number) {
    this.txPower = txPower;
    this.txPowersubscriber.next(this.txPower);
 }
 public getTxPower(): number { // Observable<number> {
   return this.txPower;
  // return this.txPowersubscriber.asObservable();
 }
 public setFrequency(frequency: number) {
   this.frequency = frequency;
   this.frequencySubscriber.next(this.txPower);
 }
 public getFrequency(): number { // Observable<number> {
  return this.frequency;
  // return this.frequencySubscriber.asObservable();
 }
 public setPropagationModel(propagationModel: ModelsOfPropagation) {
   this.propagationModel = propagationModel;
   this.propModelSubscriber.next(this.propagationModel);
 }
 public getPropagationModel(): ModelsOfPropagation { // Observable<ModelsOfPropagation> {
   return this.propagationModel;
  // return this.propModelSubscriber.asObservable();
 }
 public solveWaveLength(frequency: number): number {
    const waveLength = 300 / frequency;
    return waveLength;
 }
}
