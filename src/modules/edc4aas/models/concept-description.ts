import { IdsAssetElement } from './ids-asset-element';
import { Properties } from './properties';

export interface ConceptDescription extends IdsAssetElement{
  id: string;
  properties: Properties;
}
