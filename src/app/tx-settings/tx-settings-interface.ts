export enum ModelsOfPropagation {
  kamerman,
  oneSlope,
  multiWall
}
export interface TxSetUp {
  txPower: number;
  frequency: number;
  propagationModel: ModelsOfPropagation;
}
