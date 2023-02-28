export class IdsAssetElement {
    private _idsContractId: string;
    private _idsAssetId: string;


    constructor(idsContractId: string, idsAssetId: string) {
        this._idsContractId = idsContractId;
        this._idsAssetId = idsAssetId;
    }
    public get idsContractId(): string {
        return this._idsContractId;
    }

    public get idsAssetId(): string {
        return this._idsAssetId;
    }
}
