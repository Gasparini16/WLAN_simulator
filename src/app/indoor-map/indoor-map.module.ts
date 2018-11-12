import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';
import { AppRoutingModule } from '../app.routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [MapComponent],
  declarations: [MapComponent]
})
export class IndoorMapModule { }
