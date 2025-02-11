import { IdsAssetElement } from './ids-asset-element';
import { Properties } from './properties';

export class Submodel extends IdsAssetElement{
    properties: Properties;


    constructor(properties: Properties, id: string) {
        super(id);
        this.properties = properties;
    }

    public get _properties(): Properties {
        return this.properties;
    }

}
