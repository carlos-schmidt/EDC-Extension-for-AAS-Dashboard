import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClientService } from "../../services/client.service";

@Component({
  selector: 'Automated Negotiation',
  templateUrl: './contract-management.component.html',
  styleUrls: ['./contract-management.component.scss']
})
export class ContractManagementComponent implements OnInit {

  searching: boolean = false;
  customInput: boolean = false;
  showAccepted: boolean = false;

  accepted?: JSON;
  newAccepted?: string;

  log: string = "";
  newestLog: string = "";

  constructor(private clientService: ClientService, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  async fetchAcceptedContracts() {
    this.searching = true;

    this.clientService
      .fetchAcceptedContracts().subscribe({
        next: result => this.accepted = result,
        error: (e) => {
          console.error(e);
          this.addLogMessage("Show own accepted contracts: There was an error. Please check your EDC's output for details.");
          this.searching = false;
        },
        complete: () => {
          console.info('complete');
          this.showAccepted = true;
          this.searching = false;
          this.addLogMessage("Fetched this EDC's accepted contracts.");

        }
      });
  }

  async addAcceptedContract() {
    console.log(this.newAccepted);
    if (this.newAccepted) {
      this.clientService.addAcceptedContract(this.newAccepted).subscribe({
        next: _ => _,
        error: (e) => {
          console.error(e);
          this.addLogMessage("Add accepted contracts: There was an error. Please check your EDC's output for details.");
          this.searching = false;
        },
        complete: () => {
          console.info('complete');
          this.addLogMessage("Added accepted contract to EDC.");
          this.customInput = false;
        }
      });
    }
  }

  async addLogMessage(message: String) {
    var newLog = this.newestLog + "\n" + this.log;
    this.log = newLog;
    this.newestLog = new Date().toLocaleString() + ": " + message;
  }

  async clearLog() {
    this.newestLog = "";
    this.log = "";
  }

}
