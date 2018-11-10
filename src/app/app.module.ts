import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { TxSettingsModule } from './tx-settings/tx-settings.module';
import { IndoorMapModule } from './indoor-map/indoor-map.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PropagationModelsModule } from './propagation-models/propagation-models.module';

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
    PropagationModelsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
