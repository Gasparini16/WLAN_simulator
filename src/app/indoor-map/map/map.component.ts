import { Component, OnInit } from '@angular/core';
import { DistanceService } from '../distance-algorithm/distance';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  event: MouseEvent;
  clientXTransmitter: number;
  clientYTransmitter: number;
  clientXReceiver: number;
  clientYReceiver: number;
  isFirstClick = true;
  clientX = 0;
  clientY = 0;
  solvedDistance: number;
  constructor(private distance: DistanceService ) { }

  ngOnInit() {
  }
  coordinates(event: MouseEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }
  coordinatesOfTx(event: MouseEvent): void {
    switch (this.isFirstClick) {
      case true:
        this.clientXTransmitter = event.clientX;
        this.clientYTransmitter = event.clientY;
        this.isFirstClick = false;
        break;
      case false:
        this.clientXReceiver = event.clientX;
        this.clientYReceiver = event.clientY;
        this.isFirstClick = true;
        break;
    }
  }

  onClickSolveDistance() {
    this.distance.solveDistance(this.clientXTransmitter, this.clientYTransmitter, this.clientXReceiver, this.clientYReceiver);
    this.solvedDistance = this.distance.getDistance();
  }
  getSolvedDistance(): number {
    return this.solvedDistance;
  }
}
