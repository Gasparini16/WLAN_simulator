import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TxSetUp, ModelsOfPropagation } from '../tx-settings-interface';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.less']
})
export class TxComponent implements OnInit, TxSetUp {
  txPower: number;
  frequency: number;
  propagationModel: ModelsOfPropagation;
  txForm: FormGroup;
  propModel = ModelsOfPropagation;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.txForm = this.buildTxForm();
  }

  buildTxForm() {
    return this.formBuilder.group({
      txPower: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      frequency: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      propagationModel: ['', Validators.required]
    });
  }
  onConfirm() {
    this.txPower = this.txPower;
    this.frequency = this.frequency;
    this.propModel = this.propModel;
 }
}
