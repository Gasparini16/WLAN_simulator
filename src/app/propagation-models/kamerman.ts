import { PropagationModel } from './propagation-model';
import { PropagationModelsModule } from './propagation-models.module';

export class KamermanPropagationModel implements PropagationModel {
  pi: number;
  waveLength: number;
}
