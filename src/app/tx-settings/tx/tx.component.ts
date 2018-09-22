import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.less']
})
export class TxComponent implements OnInit {
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
