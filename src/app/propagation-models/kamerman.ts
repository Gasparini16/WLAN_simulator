import { Input, Injectable } from '@angular/core';
import { TxComponent } from '../tx-settings/tx/tx.component';

@Injectable ()
export class Kamerman {
private numerek = 10;

  public getNumber(): number {
    return this.numerek;
  }
}
