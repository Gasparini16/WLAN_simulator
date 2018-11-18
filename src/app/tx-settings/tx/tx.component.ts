import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray} from '@angular/forms';
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
  txSettingsArrayLength = 0;
  constructor(
    private formBuilder: FormBuilder,
    private txSettings: SettingsService
  ) { }

  ngOnInit() {
     this.txForm = this.buildTxForm();
  }

  buildTxForm() {
    return this.formBuilder.group({
      propagationModel: ['Kamerman', Validators.required],
        settings: this.formBuilder.array([this.createTransceiver()])}, {validator: Validators.required
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
     const array = <FormArray>this.txForm.get('settings');
     console.log(parseInt(array.at(0).get('txPower').value, 10));
     console.log(parseInt(array.at(0).get('frequency').value, 10));
  }
    resetForm() {
  this.txForm.reset();
 }
 createTransceiver(): FormGroup {
   return this.formBuilder.group({
    txPower: new FormControl ('20'),
    frequency: new FormControl ( '2412')
  });
 }
 addNewFormTransceiver(): void {
   const array = <FormArray>this.txForm.get('settings');
   array.push(this.createTransceiver());
    ++this.txSettingsArrayLength;
 }
 removeTransceiver(): void {
   const array = <FormArray>this.txForm.get('settings');
   const length = array.length;
   array.removeAt(length - 1);
   --this.txSettingsArrayLength;
 }
 onAddNewTransceiver(): void {
  const array = <FormArray>this.txForm.get('settings');
  for ( let i = 0; i < this.txSettingsArrayLength; i++) {
   const txPower: number = parseInt(array.at(i).get('txPower').value, 10);
   const frequency: number = parseInt(array.at(i).get('frequency').value, 10);
   let propModel: ModelsOfPropagation;
   switch (this.txForm.value.propagationModel) {
    case 'Kamerman':
    propModel = ModelsOfPropagation.kamerman;
    break;
    case 'Motley-Keenan':
    propModel = ModelsOfPropagation.motleyKeenan;
    break;
    case 'One-Slope':
    propModel = ModelsOfPropagation.oneSlope;
    break;
  }
  this.txSettings.addTransceiver(txPower, frequency, propModel);
  }
  console.log('Array:' + array.length);
  console.log('Tablica obiektow:' + this.txSettings.getTransceivers().length);
  console.log(array);
  console.log('tablica:'+ this.txSettings.getTransceivers());
 }
}
