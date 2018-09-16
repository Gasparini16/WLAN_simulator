import { TxSettingsModule } from './tx-settings.module';

describe('TxSettingsModule', () => {
  let txSettingsModule: TxSettingsModule;

  beforeEach(() => {
    txSettingsModule = new TxSettingsModule();
  });

  it('should create an instance', () => {
    expect(txSettingsModule).toBeTruthy();
  });
});
