import { PlotModule } from './plot.module';

describe('PlotModule', () => {
  let plotModule: PlotModule;

  beforeEach(() => {
    plotModule = new PlotModule();
  });

  it('should create an instance', () => {
    expect(plotModule).toBeTruthy();
  });
});
