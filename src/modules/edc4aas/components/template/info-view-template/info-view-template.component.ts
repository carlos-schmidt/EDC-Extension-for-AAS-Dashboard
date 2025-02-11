import { Component, Input, OnInit } from "@angular/core";
import { ConceptDescription } from "src/modules/edc4aas/models/concept-description";
import { AssetAdministrationShell } from "src/modules/edc4aas/models/shell";
import { Submodel } from "src/modules/edc4aas/models/submodel";
import { SubmodelElement } from "src/modules/edc4aas/models/submodel-element";

@Component({ selector: 'info-view', styleUrls: ['../../own-self-description-browser/own-self-description-browser.component.scss'], templateUrl: './info-view-template.component.html' })

export class InfoViewTemplate implements OnInit {

  @Input() element?: Submodel | SubmodelElement | AssetAdministrationShell | ConceptDescription;
  @Input() id?: string;
  @Input() name?: string;

  ngOnInit() { }

}
