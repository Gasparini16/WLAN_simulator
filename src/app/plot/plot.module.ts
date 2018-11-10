import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { NgxChartsModule} from '@swimlane/ngx-charts';
@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [ChartComponent]
})
export class PlotModule { }
