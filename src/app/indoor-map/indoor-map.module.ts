import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './map/map.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [MapComponent],
  declarations: [MapComponent]
})
export class IndoorMapModule { }
