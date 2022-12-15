import { IdsAssetElement } from './ids-asset-element';

export interface SubmodelElement extends IdsAssetElement {
  idShort: string;
  value?: Array<SubmodelElement>;
}
