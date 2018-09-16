import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TxComponent } from './tx/tx.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [TxComponent],
  declarations: [TxComponent]
})
export class TxSettingsModule { }
