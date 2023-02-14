import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { API_KEY } from 'src/modules/edc-dmgmt-client/variables';
import { Configuration } from '../../../edc-dmgmt-client/configuration';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescriptionContainer } from '../../models/self-description-container';
import { SelfDescriptionBrowserService } from '../../services/self-description-browser.service';

@Component({
  selector: 'Other AAS',
  templateUrl: './self-description-browser.component.html',
  styleUrls: ['./self-description-browser.component.scss']
})
export class SelfDescriptionBrowserComponent implements OnInit {

  public defaultHeaders = new HttpHeaders({ 'X-Api-Key': this.apiKey });
  public configuration = new Configuration();

  selfDescriptionContainers$: Set<SelfDescriptionContainer>;
  fetch$ = new BehaviorSubject(null);
  searchText = '';

  constructor(private selfDescriptionService: SelfDescriptionBrowserService,
    protected httpClient: HttpClient,
    @Inject(API_KEY) private apiKey: string,
    @Optional() configuration: Configuration,
    private router: Router) {
    if (configuration) {
      this.configuration = configuration;
    }
    this.selfDescriptionContainers$ = new Set();
  }

  ngOnInit(): void { }

  async onSearch() {
    if (await this.checkLink(`${this.searchText}`)) {
      this.selfDescriptionContainers$.add(this.selfDescriptionService.getAllSelfDescriptions(new URL(this.searchText), this.defaultHeaders));
    } else alert("URL not responding");
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

  reroute(site: string) {
    this.router.navigateByUrl(site);
    // TODO how do i pass element info to other sites?
  }

  checkLink = async (url: string) => (await fetch(url)).ok;

}

