import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { API_KEY } from 'src/modules/edc-dmgmt-client/variables';
import { Configuration } from '../../../edc-dmgmt-client/configuration';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescriptionContainer } from '../../models/self-description-container';
import { SelfDescriptionBrowserService } from '../../services/self-description-browser.service';
import { CONNECTOR_SELF_DESCRIPTION_API } from '../../variables';

@Component({
  selector: 'MyAAS',
  templateUrl: './own-self-description-browser.component.html',
  styleUrls: ['./own-self-description-browser.component.scss']
})
export class OwnSelfDescriptionBrowserComponent implements OnInit {

  public defaultHeaders = new HttpHeaders({ 'X-Api-Key': this.apiKey });
  public configuration = new Configuration();

  selfDescriptionContainer$?: SelfDescriptionContainer;
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
    this.provider = provider;
  }

  ngOnInit(): void {
    this.selfDescriptionContainer$ = this.selfDescriptionService.getAllSelfDescriptions(this.provider, this.defaultHeaders);
  }

  async editContract(element: IdsAssetElement) {
    // TODO see asset-editor-dialog
    alert("Navigating to contract page for asset " + element.idsContractId + "... ");
    this.reroute("/contract-definitions");
  }

  reroute(site: string) {
    this.router.navigateByUrl(site);
    // TODO how do i pass element info to other sites?
  }
}

