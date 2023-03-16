import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../services/client.service";

@Component({
  selector: 'Automated Negotiation',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  providerUrl?: URL;
  assetId?: string;
  destinationUrl?: URL;

  data?: JSON;

  searching: boolean = false;
  customInput: boolean = false;
  showAccepted: boolean = false;
  showAcceptableProviderContracts: boolean = false;

  accepted?: JSON;
  providerAcceptableForAsset?: JSON;
  newAccepted?: string;

  constructor(private clientService: ClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.providerUrl = new URL(params['2']);
      this.providerUrl = new URL(this.providerUrl?.origin + "/api/v1/ids/data");
      this.assetId = params['1'];
    });
  }

  async negotiateContractAndGetData() {

    if (this.providerUrl && await this.checkLink(this.providerUrl.toString()) && this.assetId) {
      this.searching = true;
      this.clientService
        .negotiateContractAndGetData(this.providerUrl, this.assetId).subscribe({
          next: result => { this.data = result; this.searching = false; },
          error: (e) => { console.error(e); alert("Something went wrong. Check console for error message"); this.searching = false; },
          complete: () => console.info('complete')
        });
    }
  }

  async fetchAcceptedContracts() {
    this.searching = true;

    this.clientService
      .fetchAcceptedContracts().subscribe({
        next: result => this.accepted = result,
        error: (e) => console.error(e),
        complete: () => { console.info('complete'); this.searching = false; }
      });
  }

  async addAcceptedContract() {
    console.log(this.newAccepted);
    if (this.newAccepted) {
      this.clientService.addAcceptedContract(this.newAccepted).subscribe({
        next: _ => _,
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      });
    }
  }

  async fetchProviderAcceptableContracts() {
    if (this.providerUrl && this.assetId) {
      this.searching = true;
      this.clientService
        .fetchProviderAcceptableContracts(this.providerUrl, this.assetId).subscribe({
          next: result => this.providerAcceptableForAsset = result,
          error: (e) => console.error(e),
          complete: () => { console.info('complete'); this.searching = false; }
        })
    }
  }

  checkLink = async (url: string) => (await fetch(url));
}
