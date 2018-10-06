import { IndoorMapModule } from './indoor-map.module';

describe('IndoorMapModule', () => {
  let indoorMapModule: IndoorMapModule;

  beforeEach(() => {
    indoorMapModule = new IndoorMapModule();
  });

  it('should create an instance', () => {
    expect(indoorMapModule).toBeTruthy();
  });
});
