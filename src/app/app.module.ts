import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { TxSettingsModule } from './tx-settings/tx-settings.module';
import { IndoorMapModule } from './indoor-map/indoor-map.module';
import { FormsModule } from '@angular/forms';
import { PropagationModelsModule } from './propagation-models/propagation-models.module';
import { DistanceService } from './indoor-map/distance-algorithm/distance';
import { DrawService } from './indoor-map/hotelMap/drawService';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    TxSettingsModule,
    AppRoutingModule,
    IndoorMapModule,
    FormsModule,
    PropagationModelsModule
  ],
  providers: [DistanceService, DrawService],
  bootstrap: [AppComponent]
})
export class AppModule { }
