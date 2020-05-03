import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  private redColor: number = 0;
  private greenColor: number = 0;
  private blueColor: number = 0;

  constructor() {
  }

  set setRedColor(value: number) {
    this.redColor = value;
  }

  set setGreenColor(value: number) {
    this.greenColor = value;
  }

  set setBlueColor(value: number) {
    this.blueColor = value;
  }

  get getRedColor(): number {
    return this.redColor;
  }

  get getGreenColor(): number {
    return this.greenColor;
  }

  get getBlueColor(): number {
    return this.blueColor;
  }

  public setColorToDraw(txPower: number) {
    if (txPower >= 9) {
      this.redColor = 240;
      this.greenColor = 0;
      this.blueColor = 0;
    }
    if ((txPower < 9) && (txPower >= 6)) {
      this.redColor = 240;
      this.greenColor = 40;
      this.blueColor = 0;
    }
    if ((txPower < 6) && (txPower >= 0)) {
      this.redColor = 240;
      this.greenColor = 48;
      this.blueColor = 0;
    }
    if ((txPower < 0) && (txPower >= -3)) {
      this.redColor = 240;
      this.greenColor = 60;
      this.blueColor = 0;
    }
    if ((txPower < -3) && (txPower >= -6)) {
      this.redColor = 240;
      this.greenColor = 80;
      this.blueColor = 0;
    }
    if ((txPower < -6) && (txPower >= -9)) {
      this.redColor = 240;
      this.greenColor = 100;
      this.blueColor = 0;
    }
    if ((txPower < -9) && (txPower >= -12)) {
      this.redColor = 240;
      this.greenColor = 112;
      this.blueColor = 0;
    }
    if ((txPower < -12) && (txPower >= -15)) {
      this.redColor = 240;
      this.greenColor = 120;
      this.blueColor = 0;
    }
    if ((txPower < -15) && (txPower >= -18)) {
      this.redColor = 240;
      this.greenColor = 132;
      this.blueColor = 0;
    }
    if ((txPower < -18) && (txPower >= -21)) {
      this.redColor = 240;
      this.greenColor = 140;
      this.blueColor = 0;
    }
    if ((txPower < -21) && (txPower >= -24)) {
      this.redColor = 240;
      this.greenColor = 148;
      this.blueColor = 0;
    }
    if ((txPower < -24) && (txPower >= -27)) {
      this.redColor = 240;
      this.greenColor = 160;
      this.blueColor = 0;
    }
    if ((txPower < -27) && (txPower >= -30)) {
      this.redColor = 240;
      this.greenColor = 168;
      this.blueColor = 0;
    }
    if ((txPower < -30) && (txPower >= -33)) {
      this.redColor = 240;
      this.greenColor = 184;
      this.blueColor = 0;
    }
    if ((txPower < -33) && (txPower >= -36)) {
      this.redColor = 240;
      this.greenColor = 192;
      this.blueColor = 0;
    }
    if ((txPower < -36) && (txPower >= -39)) {
      this.redColor = 240;
      this.greenColor = 200;
      this.blueColor = 0;
    }
    if ((txPower < -39) && (txPower >= -42)) {
      this.redColor = 240;
      this.greenColor = 208;
      this.blueColor = 0;
    }
    if ((txPower < -42) && (txPower >= -45)) {
      this.redColor = 240;
      this.greenColor = 216;
      this.blueColor = 0;
    }
    if ((txPower < -45) && (txPower >= 48)) {
      this.redColor = 240;
      this.greenColor = 224;
      this.blueColor = 0;
    }
    if ((txPower < -48) && (txPower >= -51)) {
      this.redColor = 240;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -51) && (txPower >= -57)) {
      this.redColor = 220;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -57) && (txPower >= -60)) {
      this.redColor = 208;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -60) && (txPower >= -63)) {
      this.redColor = 192;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -63) && (txPower >= -66)) {
      this.redColor = 180;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -66) && (txPower >= -69)) {
      this.redColor = 160;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -69) && (txPower >= -72)) {
      this.redColor = 140;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -72) && (txPower >= -75)) {
      this.redColor = 120;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -75) && (txPower >= -78)) {
      this.redColor = 100;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -78) && (txPower >= -81)) {
      this.redColor = 20;
      this.greenColor = 240;
      this.blueColor = 0;
    }
    if ((txPower < -81) && (txPower >= -84)) {
      this.redColor = 0;
      this.greenColor = 240;
      this.blueColor = 80;
    }
    if ((txPower < -84) && (txPower >= -87)) {
      this.redColor = 0;
      this.greenColor = 240;
      this.blueColor = 200;
    }
    if ((txPower < -87) && (txPower >= -90)) {
      this.redColor = 0;
      this.greenColor = 240;
      this.blueColor = 220;
    }
    if ((txPower < -90) && (txPower >= -93)) {
      this.redColor = 0;
      this.greenColor = 120;
      this.blueColor = 240;
    }
    if ((txPower < -93) && (txPower > -97)) {
      this.redColor = 0;
      this.greenColor = 40;
      this.blueColor = 240;
    }
    if (txPower <= -97) {
      this.redColor = 32;
      this.greenColor = 0;
      this.blueColor = 194;
    }
  }
}
