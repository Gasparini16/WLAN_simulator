import { OnInit, Component } from '@angular/core';
import { ResultsService } from '../results/results.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.less']
})
export class ChartComponent implements OnInit {
  constructor( results: ResultsService
    ) { }

  ngOnInit() {
  }
}
