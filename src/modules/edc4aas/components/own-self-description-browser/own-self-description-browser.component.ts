import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescriptionContainer } from '../../models/self-description-container';
import { SelfDescriptionBrowserService } from '../../services/self-description-browser.service';
import { SelfDescriptionRegistrationService } from '../../services/self-description-registration.service';
import { CONNECTOR_SELF_DESCRIPTION_API } from '../../variables';


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

  constructor(private selfDescriptionRegistrationService: SelfDescriptionRegistrationService,
    httpClient: HttpClient,
    @Inject(CONNECTOR_SELF_DESCRIPTION_API) provider: URL,
    private router: Router) {
    this.provider = provider;
    this.providerNoPath = new URL(this.provider.toString().substring(0, new URL(this.provider).pathname.length + 1));
    this.selfDescriptionService = new SelfDescriptionBrowserService(httpClient);
  }

  ngOnInit(): void {
    this.updateSelfDescriptionContainer()
  }


  async editContract(element: IdsAssetElement) {
    // TODO see asset-editor-dialog
    alert("Navigating to contract page for asset " + element.idsContractId + "... ");
    this.reroute("/contract-definitions");
  }

  async registerAAS(aas: string) {
    var sanitized = aas.toLowerCase().replace(" ", "%20");
    this.selfDescriptionRegistrationService.registerUrl(this.providerNoPath, new URL(sanitized));
    this.updateSelfDescriptionContainer();
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
