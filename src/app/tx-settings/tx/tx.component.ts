import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
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

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.txForm = this.buildTxForm();
  }

  buildTxForm() {
    return this.formBuilder.group({
      txPower: '',
      frequency: '',
      antenna: '',
      propagationModel: ''
    });
  }

}
