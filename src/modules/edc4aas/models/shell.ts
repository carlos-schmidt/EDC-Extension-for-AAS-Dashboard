import { Identification } from './identification';
import { IdsAssetElement } from './ids-asset-element';

export interface AssetAdministrationShell extends IdsAssetElement {
  idShort: string;
  identification: Identification;
}
