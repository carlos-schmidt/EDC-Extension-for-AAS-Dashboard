import { Identification } from './identification';
import { IdsAssetElement } from './ids-asset-element';

export interface ConceptDescription extends IdsAssetElement {
  idShort: string;
  identification: Identification;
}
