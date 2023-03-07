import { HttpClient, HttpHeaders, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EdcApiKeyInterceptor } from 'src/modules/app/edc.apikey.interceptor';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescriptionContainer } from '../../models/self-description-container';
import { SelfDescriptionBrowserService } from '../../services/self-description-browser.service';

@Component({
  selector: 'Other AAS',
  templateUrl: './self-description-browser.component.html',
  styleUrls: ['./self-description-browser.component.scss']
})
export class SelfDescriptionBrowserComponent implements OnInit {

  public defaultHeaders = new HttpHeaders({ 'X-Api-Key': this.httpInterceptor.apiKey });

  selfDescriptionContainers$: Set<SelfDescriptionContainer>;
  fetch$ = new BehaviorSubject(null);
  searchText = '';

  constructor(private selfDescriptionService: SelfDescriptionBrowserService,
    protected httpClient: HttpClient,
    @Inject(HTTP_INTERCEPTORS) private httpInterceptor: EdcApiKeyInterceptor,
    private router: Router) {
    this.selfDescriptionContainers$ = selfDescriptionService.getAllSelfDescriptions();
  }

  ngOnInit(): void { }

  async onSearch() {
    if (await this.checkLink(`${this.searchText}`)) {
      this.selfDescriptionService.addSelfDescriptionForUrl(new URL(this.searchText), this.defaultHeaders);
    } else alert("URL not responding");
  }

  async onDelete(selfDescriptionContainer: SelfDescriptionContainer) {
    this.selfDescriptionService.removeSelfDescriptionContainer(selfDescriptionContainer);
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

