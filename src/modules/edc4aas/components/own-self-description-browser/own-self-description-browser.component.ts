import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescriptionContainer } from '../../models/self-description-container';
import { SelfDescriptionBrowserService } from '../../services/self-description-browser.service';
import { SelfDescriptionRegistrationService } from '../../services/self-description-registration.service';
import { CONNECTOR_DEFAULT_API } from '../../variables';
import { AssetAdministrationShell } from '../../models/shell';
import { SelfDescription } from '../../models/self-description';


@Component({
  selector: 'MyAAS',
  templateUrl: './own-self-description-browser.component.html',
  styleUrls: ['./own-self-description-browser.component.scss']
})
export class OwnSelfDescriptionBrowserComponent implements OnInit {

  selfDescriptionContainer?: SelfDescriptionContainer;
  notFound: boolean = false;
  provider: URL;
  private providerNoPath: URL;
  private selfDescriptionService: SelfDescriptionBrowserService;

  constructor(httpClient: HttpClient, @Inject(CONNECTOR_DEFAULT_API) provider: URL,
    private router: Router) {
    this.provider = new URL(provider.toString().concat("/selfDescription"));
    this.providerNoPath = provider;
    this.selfDescriptionService = new SelfDescriptionBrowserService(httpClient);
  }

  ngOnInit() {
    this.updateSelfDescriptionContainer();
  }

  async editContract(element: IdsAssetElement) {
    // TODO see asset-editor-dialog
    alert("Navigating to contract page for asset " + element.idsContractId + "... ");
    this.reroute("/contract-definitions");
  }

  async updateSelfDescriptionContainer() {
    this.selfDescriptionService.readSelfDescriptions(this.provider);
    var allSelfDescriptions = this.selfDescriptionService.getAllSelfDescriptions();
    this.selfDescriptionContainer = allSelfDescriptions.values().next().value;
  }

  async reroute(site: string) {
    this.router.navigateByUrl(site);
    // TODO how do you pass element info to other sites?
  }
}
