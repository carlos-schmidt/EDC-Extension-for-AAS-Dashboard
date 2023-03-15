import { Component } from "@angular/core";
import { ClientService } from "../../services/client.service";

@Component({
  selector: 'Automated Negotiation',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent {

  providerUrl?: URL;
  assetId?: string;
  destinationUrl?: URL;

  data?: any;

  constructor(private clientService: ClientService) {
  }

  async negotiateContractAndGetData() {
    if (this.providerUrl && this.assetId) {
      this.clientService
        .negotiateContractAndGetData(this.providerUrl, this.assetId)
        .subscribe(result => this.data = result);
    }
  }
}
