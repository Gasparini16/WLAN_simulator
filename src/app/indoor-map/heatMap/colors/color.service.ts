import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private _redColor: number = 0;
  private _greenColor: number = 0;
  private _blueColor: number = 0;

  constructor() {
  }

  set redColor(value: number) {
    this._redColor = value;
  }

  set greenColor(value: number) {
    this._greenColor = value;
  }

  set blueColor(value: number) {
    this._blueColor = value;
  }

  get redColor(): number {
    return this._redColor;
  }

  get greenColor(): number {
    return this._greenColor;
  }

  get blueColor(): number {
    return this._blueColor;
  }

  public setColorToDraw(txPower: number) {
    if (txPower >= 9) {
      this._redColor = 240;
      this._greenColor = 0;
      this._blueColor = 0;
    }
    if ((txPower < 9) && (txPower >= 6)) {
      this._redColor = 240;
      this._greenColor = 40;
      this._blueColor = 0;
    }
    if ((txPower < 6) && (txPower >= 0)) {
      this._redColor = 240;
      this._greenColor = 48;
      this._blueColor = 0;
    }
    if ((txPower < 0) && (txPower >= -3)) {
      this._redColor = 240;
      this._greenColor = 60;
      this._blueColor = 0;
    }
    if ((txPower < -3) && (txPower >= -6)) {
      this._redColor = 240;
      this._greenColor = 80;
      this._blueColor = 0;
    }
    if ((txPower < -6) && (txPower >= -9)) {
      this._redColor = 240;
      this._greenColor = 100;
      this._blueColor = 0;
    }
    if ((txPower < -9) && (txPower >= -12)) {
      this._redColor = 240;
      this._greenColor = 112;
      this._blueColor = 0;
    }
    if ((txPower < -12) && (txPower >= -15)) {
      this._redColor = 240;
      this._greenColor = 120;
      this._blueColor = 0;
    }
    if ((txPower < -15) && (txPower >= -18)) {
      this._redColor = 240;
      this._greenColor = 132;
      this._blueColor = 0;
    }
    if ((txPower < -18) && (txPower >= -21)) {
      this._redColor = 240;
      this._greenColor = 140;
      this._blueColor = 0;
    }
    if ((txPower < -21) && (txPower >= -24)) {
      this._redColor = 240;
      this._greenColor = 148;
      this._blueColor = 0;
    }
    if ((txPower < -24) && (txPower >= -27)) {
      this._redColor = 240;
      this._greenColor = 160;
      this._blueColor = 0;
    }
    if ((txPower < -27) && (txPower >= -30)) {
      this._redColor = 240;
      this._greenColor = 168;
      this._blueColor = 0;
    }
    if ((txPower < -30) && (txPower >= -33)) {
      this._redColor = 240;
      this._greenColor = 184;
      this._blueColor = 0;
    }
    if ((txPower < -33) && (txPower >= -36)) {
      this._redColor = 240;
      this._greenColor = 192;
      this._blueColor = 0;
    }
    if ((txPower < -36) && (txPower >= -39)) {
      this._redColor = 240;
      this._greenColor = 200;
      this._blueColor = 0;
    }
    if ((txPower < -39) && (txPower >= -42)) {
      this._redColor = 240;
      this._greenColor = 208;
      this._blueColor = 0;
    }
    if ((txPower < -42) && (txPower >= -45)) {
      this._redColor = 240;
      this._greenColor = 216;
      this._blueColor = 0;
    }
    if ((txPower < -45) && (txPower >= 48)) {
      this._redColor = 240;
      this._greenColor = 224;
      this._blueColor = 0;
    }
    if ((txPower < -48) && (txPower >= -51)) {
      this._redColor = 240;
      this._greenColor = 240;
      this._blueColor = 0;
    }
    if ((txPower < -51) && (txPower >= -57)) {
      this._redColor = 220;
      this._greenColor = 240;
      this._blueColor = 100;
    }
    if ((txPower < -57) && (txPower >= -60)) {
      this._redColor = 180;
      this._greenColor = 240;
      this._blueColor = 0;
    }
    if ((txPower < -60) && (txPower >= -63)) {
      this._redColor = 160;
      this._greenColor = 240;
      this._blueColor = 0;
    }
    if ((txPower < -63) && (txPower >= -66)) {
      this._redColor = 130;
      this._greenColor = 240;
      this._blueColor = 0;
    }
    if ((txPower < -66) && (txPower >= -69)) {
      this._redColor = 90;
      this._greenColor = 240;
      this._blueColor = 0;
    }
    if ((txPower < -69) && (txPower >= -72)) {
      this._redColor = 40;
      this._greenColor = 255;
      this._blueColor = 0;
    }
    if ((txPower < -72) && (txPower >= -75)) {
      this._redColor = 120;
      this._greenColor = 240;
      this._blueColor = 150;
    }
    if ((txPower < -75) && (txPower >= -78)) {
      this._redColor = 100;
      this._greenColor = 240;
      this._blueColor = 180;
    }
    if ((txPower < -78) && (txPower >= -81)) {
      this._redColor = 60;
      this._greenColor = 240;
      this._blueColor = 180;
    }
    if ((txPower < -81) && (txPower >= -84)) {
      this._redColor = 0;
      this._greenColor = 255;
      this._blueColor = 240;
    }
    if ((txPower < -84) && (txPower >= -87)) {
      this._redColor = 0;
      this._greenColor = 160;
      this._blueColor = 240;
    }
    if ((txPower < -87) && (txPower >= -90)) {
      this._redColor = 0;
      this._greenColor = 130;
      this._blueColor = 255;
    }
    if ((txPower < -90) && (txPower >= -93)) {
      this._redColor = 0;
      this._greenColor = 120;
      this._blueColor = 240;
    }
    if ((txPower < -93) && (txPower > -97)) {
      this._redColor = 120;
      this._greenColor = 80;
      this._blueColor = 255;
    }
    if (txPower <= -97) {
      this._redColor = 150;
      this._greenColor = 0;
      this._blueColor = 255;
    }
  }
}
