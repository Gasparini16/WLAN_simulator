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
      txPower: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      frequency: ['', [Validators.required, Validators.pattern('[0-9]*$')]],
      propagationModel: ['', Validators.required]
    });
  }

  onSubmit() {
     this.txSettings.setTxPower(parseInt(this.txForm.value.txPower, 10));
     this.txSettings.setFrequency(parseInt(this.txForm.value.frequency, 10));
     switch (this.txForm.value.propagationModel) {
       case 'Kamerman':
       this.txSettings.setPropagationModel(ModelsOfPropagation.kamerman);
       break;
       case 'Motley-Keenan':
       this.txSettings.setPropagationModel(ModelsOfPropagation.motleyKeenan);
       break;
       case 'One-Slope':
       this.txSettings.setPropagationModel(ModelsOfPropagation.oneSlope);
       break;
     }
    // this.txForm.get('txPower').valueChanges.subscribe((txpower: number) => {
    //   this.txSettings.setTxPower(txpower);
    // });
    // this.txForm.get('frequency').valueChanges.subscribe((frequency: number) => {
    //   this.txSettings.setFrequency(frequency);
    // });
    // switch (this.txForm.value.propagationModel) {
    //   case 'Kamerman':
    //   this.txForm.get('propagationModel').valueChanges.subscribe( () => {
    //     this.txSettings.setPropagationModel(ModelsOfPropagation.kamerman);
    //   });
    //   break;
    //   case 'Motley-Keenan':
    //   this.txForm.get('propagationModel').valueChanges.subscribe(() => {
    //     this.txSettings.setPropagationModel(ModelsOfPropagation.motleyKeenan);
    //   });
    //   break;
    //   case 'One-Slope':
    //   this.txForm.get('propagationModel').valueChanges.subscribe(() => {
    //     this.txSettings.setPropagationModel(ModelsOfPropagation.oneSlope);
    //   });
    //   break;
    // }
    console.log(this.txSettings.getFrequency());
  }
    resetForm() {
  this.txForm.reset();
 }
}
