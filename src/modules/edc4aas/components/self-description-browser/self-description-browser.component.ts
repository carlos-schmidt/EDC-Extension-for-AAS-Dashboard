import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { API_KEY } from 'src/modules/edc-dmgmt-client/variables';
import { Configuration } from '../../../edc-dmgmt-client/configuration';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescription } from '../../models/self-description';
import { SelfDescriptionContainer } from '../../models/self-description-container';
import { SelfDescriptionBrowserService } from '../../services/self-description-browser.service';
import { CONNECTOR_SELF_DESCRIPTION_API } from '../../variables';

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

  constructor(private selfDescriptionService: SelfDescriptionBrowserService,
    protected httpClient: HttpClient,
    @Inject(CONNECTOR_SELF_DESCRIPTION_API) provider: URL,
    @Inject(API_KEY) private apiKey: string,
    @Optional() configuration: Configuration,
    private router: Router) {
    if (configuration) {
      this.configuration = configuration;
    }
    this.selfDescriptionContainers$ = new Set();
    this.provider = provider;
  }

  ngOnInit(): void {
    this.selfDescriptionContainers$?.add(this.selfDescriptionService.getAllSelfDescriptions(this.provider, this.defaultHeaders));
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
    this.reroute("/contracts");

  }

  async editAsset(element: IdsAssetElement) {
    // TODO see asset-editor-dialog
    console.log(element);
    alert("Navigating to asset page for asset " + element.idsAssetId + "... ");
    this.reroute("/my-assets");
  }

  // TODO use this to navigate to assetEdit / negotiate pages
  reroute(site: string) {
    this.router.navigateByUrl(site);
  }

  checkLink = async (url: string) => (await fetch(url)).ok

}

