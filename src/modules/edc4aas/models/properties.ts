import { SubmodelElement } from './submodel-element';

export class Properties {
    idShort: string;
    submodelElements?: Array<SubmodelElement>;
    value?: Array<SubmodelElement>;
    id? : string;


    constructor(_idShort: string, _submodelElements: Array<SubmodelElement>, _value:Array<SubmodelElement>) {
        this.idShort = _idShort;
        this.submodelElements = _submodelElements;
        this.value = _value;
    }

    public get _idShort(): string {
        return this.idShort;

    }
}
