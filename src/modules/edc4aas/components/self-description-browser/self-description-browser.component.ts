import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Configuration } from '../../../edc-dmgmt-client/configuration';
import { API_KEY, CONNECTOR_DATAMANAGEMENT_API, CONNECTOR_SELF_DESCRIPTION_API } from '../../../edc-dmgmt-client/variables';
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
    @Inject(CONNECTOR_SELF_DESCRIPTION_API) provider: URL,
    @Inject(API_KEY) private apiKey: string,
    @Optional() configuration: Configuration,
    private router: Router) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      this.configuration.basePath = basePath;
    }
    this.selfDescriptionContainers$ = new Set();
    this.provider = provider;
  }
  // TODO: html stuff into ts (dynamically build site)
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
    if (await this.checkLink(`${this.searchText}`)) {
      const selfDescriptions = this.fetch$
        .pipe(
          switchMap(() => {
            return this.httpClient.get<Array<SelfDescription>>(`${this.searchText}`);
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
    // TODO see asset-negotiator-dialog
    console.log(element, provider);
    alert("negotiate asset " + element.idsAssetId + " from " + provider.toString());
  }

  async editAsset(element: IdsAssetElement) {
    // TODO see asset-editor-dialog
    console.log(element);
    alert("edit asset " + element.idsAssetId);
  }

  // TODO use this to navigate to assetEdit / negotiate pages
  reroute(site: string) {
    this.router.navigateByUrl(site);
  }

  checkLink = async (url: string) => (await fetch(url)).ok
}
