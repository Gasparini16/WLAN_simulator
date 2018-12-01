import { Component, OnInit, Input } from '@angular/core';
import { DistanceService } from '../distance-algorithm/distanceService';
import { DrawService } from '../hotelMap/drawService';
import {HeatMapService} from "../heatMap/heat-map.service";

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
    private drawHotel: DrawService, private heatMap: HeatMapService ) {}

  ngOnInit() {
    this.drawHotel.drawHotelMap();
    this.onClickSolveDistance();
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
        this.distance.coordinateXTransceiver = this.clientXTransmitter;
        this.distance.coordinateYTransceiver = this.clientYTransmitter;
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
    this.distance.getSubDistance().subscribe(data => {
      this.solvedDistance = data;
    });
  }
  onClickDrawHeatMap() {
    this.heatMap.putColorOnPixel();
  }
  getSolvedDistance() {
    return this.solvedDistance;
  }
}
