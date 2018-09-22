import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TxComponent } from './tx/tx.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [TxComponent],
  declarations: [TxComponent]
})
export class TxSettingsModule { }
