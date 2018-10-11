import { PropagationModel } from './propagation-model';
import { angularMath } from 'angular-ts-math';


export class OneSlopePropagationModel implements PropagationModel {
  waveLength: number;
  piNumber = angularMath.pi;


}
