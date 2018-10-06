import { PropagationModelsModule } from './propagation-models.module';

describe('PropagationModelsModule', () => {
  let propagationModelsModule: PropagationModelsModule;

  beforeEach(() => {
    propagationModelsModule = new PropagationModelsModule();
  });

  it('should create an instance', () => {
    expect(propagationModelsModule).toBeTruthy();
  });
});
