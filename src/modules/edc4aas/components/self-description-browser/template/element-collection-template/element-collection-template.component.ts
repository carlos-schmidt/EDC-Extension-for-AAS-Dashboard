import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SubmodelElement } from "src/modules/edc4aas/models/submodel-element";
@Component({ selector: 'element-collection', styleUrls: ['../../self-description-browser.component.scss'], templateUrl: './element-collection-template.component.html' })

export class ElementCollectionTemplate implements OnInit {
  @Input() element?: SubmodelElement;
  @Input() provider?: URL;
  router: Router;

  ngOnInit() { }

  constructor(router: Router) {
    this.router = router;
  }

  async negotiateContract(element?: string, provider?: URL) {
    // TODO see asset-negotiator-dialog
    console.log(element, provider);
    //alert("negotiate asset " + element.idsAssetId + " from " + provider.toString());
    this.router.navigate(["/client", element, provider?.toString()]);
  }
}
