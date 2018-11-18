export enum ModelsOfPropagation {
  kamerman = 'KAMERMAN',
  oneSlope = 'ONE-SLOPE',
  motleyKeenan = 'MOTLEY-KEENAN'
}
export interface TxSetUp {
  txPower: number;
  frequency: number;
  propagationModel: ModelsOfPropagation;
  coordinateX: number;
  coordinateY: number;

  setTxPower(txPower: number);
  getTxPower(): number;
  setFrequency(frequency: number);
  getFrequency(): number;
  setPropagationModel(propagationModel: ModelsOfPropagation);
  getPropagationModel(): ModelsOfPropagation;
  setCoordinateX(corX: number);
  getCoordinateX(): number;
  setCoordinateY(corY: number);
  getCoordinateY();
}
