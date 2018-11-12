import { OnInit, Component } from '@angular/core';
import { ResultsService } from '../results/results.service';
import {Chart} from 'angular-highcharts';
import { SettingsService } from 'src/app/tx-settings/settings-service/settings.service';
import { DistanceService } from 'src/app/indoor-map/distance-algorithm/distanceService';
import { OneSlope } from 'src/app/propagation-models/one-slope';
import { DrawService } from 'src/app/indoor-map/hotelMap/drawService';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {
  constructor(private results: ResultsService) {}
  chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: 'Path loss'
    },
    credits: {
      enabled: false
    },
    series: [
      {
        name: 'Line 1'
      }
    ]
  });

  ngOnInit() {
  }
  myChart() {
     if (this.results.distanceArray.length === this.results.pathLoss.length) {
       for (let i = 0; i < this.results.distanceArray.length; i++) {
         this.chart.addPoint([this.results.distanceArray[i], this.results.pathLoss[i]]);
       }
     }
  }
  count() {
    this.results.solvePathLossPropagationModel();
  }
}
