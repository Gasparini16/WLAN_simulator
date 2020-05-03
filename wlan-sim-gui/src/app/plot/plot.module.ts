import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { NgxChartsModule} from '@swimlane/ngx-charts';
import { AppRoutingModule } from '../app.routing.module';
import { ChartModule } from 'angular-highcharts';
@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule,
    AppRoutingModule,
    ChartModule
  ],
  declarations: [ChartComponent],
  exports: [ChartComponent]
})
export class PlotModule { }
