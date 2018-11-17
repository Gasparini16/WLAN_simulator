import { OnInit, Component } from '@angular/core';
import { ResultsService } from '../results/results.service';
import {Chart} from 'angular-highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {
  constructor(private results: ResultsService) {}
 chart: Chart;

  ngOnInit() {
    this.init();
  }
  myChart() {
     if (this.results.distanceArray.length === this.results.pathLoss.length) {
       for (let i = 0; i < this.results.distanceArray.length; i++) {
         this.chart.addPoint([this.results.distanceArray[i], this.results.pathLoss[i]], 0);
       }
     }
  }
  count() {
    this.results.solvePathLossPropagationModel();
  }
  remove() {
     this.chart.removeSerie(this.chart.ref.series.length - 1);
  }
  init() {
     this.chart = new Chart({
      chart: {
        type: 'line',
      },
      title: {
        text: 'Power level'
      },
      credits: {
        enabled: false
      },
      series: [
        {
          name: 'Attenuation ' + this.results.propModel
        }
      ],
      xAxis: {
        title: {
          text: 'distance [m]'
      }},
      yAxis: {
        title: {
          text: 'Power level [dBm]'
        }
      }
    });
    this.chart.ref$.subscribe(console.log);
  }
}
