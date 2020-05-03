import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TxSettingsModule } from '../tx-settings/tx-settings.module';
import { IndoorMapModule } from '../indoor-map/indoor-map.module';
import { MapComponent } from '../indoor-map/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    TxSettingsModule,
    IndoorMapModule
  ],
  declarations: []
})
export class PropagationModelsModule {

 }
