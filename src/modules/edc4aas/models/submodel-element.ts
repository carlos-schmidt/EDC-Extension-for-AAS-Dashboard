import { IdsAssetElement } from './ids-asset-element';
import { Properties } from './properties';

export interface SubmodelElement extends IdsAssetElement {
  properties: Properties;
}
