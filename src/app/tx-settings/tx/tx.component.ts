import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { ModelsOfPropagation } from '../tx-settings-interface';
import { SettingsService } from '../settings-service/settings.service';

@Component({
  selector: 'app-tx',
  templateUrl: './tx.component.html',
  styleUrls: ['./tx.component.less']
})
export class TxComponent implements OnInit {
  txForm: FormGroup;
  propModel = ModelsOfPropagation;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private txSettings: SettingsService
  ) { }

  ngOnInit() {
     this.txForm = this.buildTxForm();
  }

  buildTxForm() {
    return this.formBuilder.group({
      txPower: ['20', [Validators.required, Validators.pattern('[0-9]*$')]],
      frequency: ['2412', [Validators.required, Validators.pattern('[0-9]*$')]],
      propagationModel: ['Kamerman', Validators.required]
    });
  }

  onSubmit() {
     this.txSettings.setTxPower(parseInt(this.txForm.value.txPower, 10));
     this.txSettings.setFrequency(parseInt(this.txForm.value.frequency, 10));
     switch (this.txForm.value.propagationModel) {
       case 'Kamerman':
       this.txSettings.setPropagationModel(ModelsOfPropagation.kamerman);
       break;
       case 'Multi-Wall':
       this.txSettings.setPropagationModel(ModelsOfPropagation.multiWall);
       break;
       case 'One-Slope':
       this.txSettings.setPropagationModel(ModelsOfPropagation.oneSlope);
       break;
     }
  }
    resetForm() {
  this.txForm.reset();
 }
}
