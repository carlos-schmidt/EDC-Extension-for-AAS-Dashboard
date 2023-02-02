import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, Inject, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { API_KEY } from 'src/modules/edc-dmgmt-client/variables';
import { Configuration } from '../../../edc-dmgmt-client/configuration';
import { ConceptDescription } from '../../models/concept-description';
import { IdsAssetElement } from '../../models/ids-asset-element';
import { SelfDescription } from '../../models/self-description';
import { SelfDescriptionContainer } from '../../models/self-description-container';
import { AssetAdministrationShell } from '../../models/shell';
import { Submodel } from '../../models/submodel';
import { SubmodelElement } from '../../models/submodel-element';
import { CONNECTOR_SELF_DESCRIPTION_API } from '../../variables';
import { InformationTemplate } from './template/information-template';

@Component({
  selector: 'Browse Self Description',
  templateUrl: './self-description-browser.component.html',
  styleUrls: ['./self-description-browser.component.scss']
})
export class SelfDescriptionBrowserComponent implements OnInit, AfterViewInit {

  public defaultHeaders = new HttpHeaders({ 'X-Api-Key': this.apiKey });
  public configuration = new Configuration();
  selfDescriptionContainers$: Set<SelfDescriptionContainer>;
  fetch$ = new BehaviorSubject(null);
  searchText = '';
  provider: URL;

  constructor(protected httpClient: HttpClient,
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

  // TODO: html stuff into ts (dynamically build site)
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    const selfDescriptions = this.fetch$
      .pipe(
        switchMap(() => {
          return this.httpClient.get<Array<SelfDescription>>(this.provider.toString(),
            { headers: this.defaultHeaders });
        }));
    this.drawSelfDescription(new SelfDescriptionContainer(selfDescriptions, this.provider));
    //this.selfDescriptionContainers$?.add(new SelfDescriptionContainer(selfDescriptions, this.provider));

  }

  async onSearch() {
    if (await this.checkLink(`${this.searchText}`)) {
      const selfDescriptions = this.fetch$
        .pipe(
          switchMap(() => {
            return this.httpClient.get<Array<SelfDescription>>(`${this.searchText}`);
          }));
      this.drawSelfDescription(new SelfDescriptionContainer(selfDescriptions, this.provider));
      //this.selfDescriptionContainers$?.add(new SelfDescriptionContainer(selfDescriptions, new URL(this.searchText)));
    } else {
      alert("URL not responding")
    }
  }

  async onDelete(selfDescriptionContainer: SelfDescriptionContainer) {
    this.selfDescriptionContainers$.delete(selfDescriptionContainer);
  }

  async drawSelfDescription(selfDescriptionContainer: SelfDescriptionContainer) {
    const selfDescriptionsContainerDiv = document.getElementById("self-descriptions");
    // TODO why is this undefineds
    const selfDescriptionsContainer = document.createElement('ng-container');
    console.log(selfDescriptionsContainer?.innerHTML);
    const information = document.createElement('mat-card');
    const informationHeader = document.createElement('mat-card-header');
    informationHeader.innerHTML = "Hello World";
    const informationBody = document.createElement('mat-card-body')
    information.appendChild(informationHeader);
    information.appendChild(informationBody);
    selfDescriptionContainer.selfDescriptions.subscribe(selfDescriptions =>
      selfDescriptions.forEach(selfDescription => {
        informationBody.appendChild(this.drawShells(selfDescription.assetAdministrationShells));
        informationBody.appendChild(this.drawSubmodels(selfDescription.submodels));
        informationBody.appendChild(this.drawConceptDescriptions(selfDescription.conceptDescriptions));
      }));
    selfDescriptionsContainer.appendChild(information);
    selfDescriptionsContainerDiv?.appendChild(selfDescriptionsContainer);
    const divider = document.createElement('mat-divider');
    divider.className = "mat-divider";
    selfDescriptionsContainerDiv?.appendChild(divider);
  }

  drawShells(assetAdministrationShells: AssetAdministrationShell[]): HTMLElement {
    const shellList = document.createElement('mat-list');
    assetAdministrationShells.forEach(shell => {
      const listItem = InformationTemplate.renderShell(shell);
      shellList.appendChild(listItem);
    }
    );
    return shellList;
  }

  drawSubmodels(submodels: Submodel[]): HTMLElement {
    const submodelList = document.createElement('mat-list');
    submodels.forEach(submodel => {
      const listItem = InformationTemplate.renderSubmodel(submodel);
      const innerList = document.createElement(`mat-list`);
      submodel.submodelElements.forEach(element => {
        innerList.appendChild(this.drawSubmodelElement(element))
      });
      submodelList.appendChild(listItem);
      submodelList.appendChild(innerList);
    }
    );
    return submodelList;
  }

  drawSubmodelElement(element: SubmodelElement): HTMLElement {
    const listItem = InformationTemplate.renderSubmodelElement(element);

    const innerList = document.createElement(`mat-list`);
    element.value?.forEach(innerElement => {
      innerList.appendChild(this.drawSubmodelElement(innerElement));
      listItem.appendChild(innerList);
    }
    );
    return listItem;
  }

  drawConceptDescriptions(conceptDescriptions: ConceptDescription[]): HTMLElement {
    const conceptDescriptionList = document.createElement('mat-list');
    conceptDescriptions.forEach(conceptDescription => {
      const listItem = InformationTemplate.renderConceptDescription(conceptDescription);
      conceptDescriptionList.appendChild(listItem);
    }
    );
    return conceptDescriptionList;
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

