import { PropagationModel } from './propagation-model';
import {PropagationModelsModule} from './propagation-models.module';
import { angularMath } from 'angular-ts-math';
import { TxSettingsModule } from '../tx-settings/tx-settings.module';
import { TxComponent } from '../tx-settings/tx/tx.component';


export class OneSlopePropagationModel implements PropagationModel {
  waveLength: number;
  const pi: number = angularMath.pi;
  solveOneSlope() number {
  }

}
