import { Component, OnInit } from '@angular/core';
import { angularMath } from 'angular-ts-math';

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
  distance = 0;
  clientX = 0;
  clientY = 0;
  constructor() { }

  ngOnInit() {
  }
  coordinates(event: MouseEvent): void {
    this.clientX = event.clientX;
    this.clientY = event.clientY;
  }
  coordinatesOfTx(event: MouseEvent): void {
    switch(this.isFirstClick) {
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

  setClientXTransmitter(corXTransmitter): void {
    this.clientXTransmitter = corXTransmitter;
  }
  setClientYTransmitter(corYTransmitter): void {
    this.clientYTransmitter = corYTransmitter;
  }
  setClientXReceiver(corXReceiver): void {
    this.clientXReceiver = corXReceiver;
  }
  setClientYReceiver(corYReceiver): void {
    this.clientYReceiver = corYReceiver;
  }


  getclientXTransmitter(): number {
    return this.clientXTransmitter;
  }
  getclientYTransmitter(): number {
    return this.clientYTransmitter;
  }
  getclientXReceiver(): number {
    return this.clientXReceiver;
  }
  getclientYReceiver(): number {
    return this.clientYReceiver;
  }
  solveDistance(): number {
    this.distance = angularMath.squareOfNumber(angularMath.powerOfNumber((this.clientXReceiver - this.clientXTransmitter), 2) +
    angularMath.powerOfNumber((this.clientYReceiver - this.clientYTransmitter) , 2));
    this.distance = angularMath.div(this.distance, 38);
    this.distance = angularMath.mul(this.distance, 353);
    this.distance = angularMath.div(this.distance, 100);
    return this.distance;
  }
}
