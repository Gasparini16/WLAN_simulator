import { Component, OnInit } from '@angular/core';
import { DistanceService } from '../distance-algorithm/distanceService';
import { DrawService } from '../hotelMap/drawService';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.less']
})
export class MapComponent implements OnInit {
  event: MouseEvent;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
 clientXTransmitter: number;
 clientYTransmitter: number;
 clientXReceiver: number;
 clientYReceiver: number;
 isFirstClick = true;
 clientX = 0;
 clientY = 0;
 solvedDistance: number;

  constructor(private distance: DistanceService,
    private drawHotel: DrawService ) {}

  ngOnInit() {
    this.drawHotel.drawHotelMap();
  }

  coordinates(event: MouseEvent, canvas: HTMLCanvasElement): void {
    canvas = <HTMLCanvasElement> document.getElementById('hotelMap');
    const bounds = canvas.getBoundingClientRect();
    this.clientX = event.clientX - bounds.left;
    this.clientY = event.clientY - bounds.top;
  }
  coordinatesOfTx(event: MouseEvent , canvas: HTMLCanvasElement): void {
    canvas = <HTMLCanvasElement> document.getElementById('hotelMap');
    const bounds = canvas.getBoundingClientRect();
    switch (this.isFirstClick) {
      case true:
        this.clientXTransmitter = event.clientX - bounds.left;
        this.clientYTransmitter = event.clientY - bounds.top;
        this.isFirstClick = false;
        break;
      case false:
        this.clientXReceiver = event.clientX - bounds.left;
        this.clientYReceiver = event.clientY - bounds.top;
        this.isFirstClick = true;
        break;
    }
  }

  onClickSolveDistance() {
    this.distance.solveDistance(this.clientXTransmitter, this.clientYTransmitter, this.clientXReceiver, this.clientYReceiver);
    this.drawHotel.solveEquation(this.clientXTransmitter, this.clientYTransmitter, this.clientXReceiver, this.clientYReceiver);
    this.solvedDistance = this.distance.getDistance();
  }
  getSolvedDistance(): number {
    return this.solvedDistance;
  }

}
