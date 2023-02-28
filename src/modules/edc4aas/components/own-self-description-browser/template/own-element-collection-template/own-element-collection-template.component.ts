import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubmodelElement } from "src/modules/edc4aas/models/submodel-element";

@Component({ selector: 'own-element-collection', styleUrls: ['../../own-self-description-browser.component.scss'], templateUrl: './own-element-collection-template.component.html' })
export class OwnElementCollectionTemplate implements OnInit {
  @Input() element?: SubmodelElement;
  @Input() idsContractId?: string;
  router: Router;

  ngOnInit() { }

  constructor(router: Router) {
    this.router = router;
  }

  editContract(idsContractId?: string) {
    alert("Editing contract " + idsContractId + "...");
    this.router.navigateByUrl("/contract-definitions");
  }
}
