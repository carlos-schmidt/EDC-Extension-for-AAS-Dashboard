import { Identification } from './identification';
import { IdsAssetElement } from './ids-asset-element';
import { SubmodelElement } from './submodel-element';

export class Submodel extends IdsAssetElement {
    private _idShort: string;
    private _identification: Identification;
    private _submodelElements: Array<SubmodelElement>;


    constructor(idsContractId: string, idsAssetElement: string, idShort: string, identification: Identification, submodelElements: Array<SubmodelElement>) {
        super(idsContractId, idsAssetElement);
        this._idShort = idShort;
        this._identification = identification;
        this._submodelElements = submodelElements;
    }

    public get idShort(): string {
        return this._idShort;

    } public get identification(): Identification {
        return this._identification;
    }

    public get submodelElements(): Array<SubmodelElement> {
        return this._submodelElements;
    }
}
