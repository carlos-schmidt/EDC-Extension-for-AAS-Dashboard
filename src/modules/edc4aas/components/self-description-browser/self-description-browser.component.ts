import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Configuration } from '../../../edc-dmgmt-client/configuration';
import { API_KEY, CONNECTOR_DATAMANAGEMENT_API } from '../../../edc-dmgmt-client/variables';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescription } from '../../models/self-description';
import { SelfDescriptionContainer } from '../../models/self-description-container';

@Component({
    selector: 'Browse Self Description',
    templateUrl: './self-description-browser.component.html',
    styleUrls: ['./self-description-browser.component.scss']
})
export class SelfDescriptionBrowserComponent implements OnInit {

    public defaultHeaders = new HttpHeaders({ 'X-Api-Key': this.apiKey });
    public configuration = new Configuration();
    selfDescriptionContainers$: Set<SelfDescriptionContainer>;
    fetch$ = new BehaviorSubject(null);
    searchText = '';
    provider: URL;

    constructor(protected httpClient: HttpClient,
        @Inject(CONNECTOR_DATAMANAGEMENT_API) basePath: string,
        @Inject(API_KEY) private apiKey: string,
        @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            this.configuration.basePath = basePath;
        }
        this.selfDescriptionContainers$ = new Set();
        this.provider = new URL("http://localhost:8182/api/selfDescription"); // TODO get from config
    }

    ngOnInit(): void {
        const selfDescriptions = this.fetch$
            .pipe(
                switchMap(() => {
                    return this.httpClient.get<Array<SelfDescription>>(this.provider.toString(),
                        { headers: this.defaultHeaders });
                }));
        this.selfDescriptionContainers$?.add(new SelfDescriptionContainer(selfDescriptions, this.provider));
    }

    async onSearch() {
        if (await this.checkLink(`${this.searchText}/api/selfDescription`)) {
            const selfDescriptions = this.fetch$
                .pipe(
                    switchMap(() => {
                        return this.httpClient.get<Array<SelfDescription>>(`${this.searchText}/api/selfDescription`);
                    }));
            this.selfDescriptionContainers$?.add(new SelfDescriptionContainer(selfDescriptions, new URL(this.searchText)));
        } else {
            alert("URL not responding")
        }
    }

    async onDelete(selfDescriptionContainer: SelfDescriptionContainer) {
        this.selfDescriptionContainers$.delete(selfDescriptionContainer);
    }

    async negotiateContract(element: IdsAssetElement, provider: URL) {
        // TODO see asset-editor-dialog
        console.log(element, provider);
        alert("negotiate asset " + element.idsAssetId + " from " + provider.toString());
    }

    async editAsset(element: IdsAssetElement) {
        // TODO see asset-editor-dialog
        console.log(element);
        alert("edit asset " + element.idsAssetId);
    }

    checkLink = async (url: string) => (await fetch(url)).ok
}
