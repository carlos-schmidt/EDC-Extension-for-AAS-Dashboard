export class IdsAssetElement {
    id: string;


    constructor(idsAssetId: string) {
        this.id = idsAssetId;
    }

    public get _id(): string {
        return this.id;
    }
}
