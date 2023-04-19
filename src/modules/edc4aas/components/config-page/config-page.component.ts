import { Component, Inject, OnInit } from "@angular/core";
import { EDC4AASConfigService } from "../../services/edc4aas-config.service";
import { CONNECTOR_DEFAULT_API } from "../../variables";

@Component({
  selector: 'Config',
  templateUrl: './config-page.component.html',
  styleUrls: ['./config-page.component.scss']
})
export class ConfigPageComponent implements OnInit {

  config?: Map<string, string>;
  provider: URL;

  log: string = "";
  newestLog: string = "";

  constructor(private edc4AASConfigService: EDC4AASConfigService,
    @Inject(CONNECTOR_DEFAULT_API) provider: URL) {
    this.provider = provider;
  }

  public ngOnInit() {
    this.fetchConfig();
  }

  async fetchConfig() {
    this.edc4AASConfigService.getConfig(this.provider).subscribe({
      next: (data) => this.config = new Map(Object.entries(data)),
      error: (e) => {
        console.error(e);
        this.addLogMessage("Fetch config: There was an error. Please check your EDC's output or the dashboard's configuration for details.");
      },
      complete: () => {
        console.info('complete');
        this.addLogMessage("Fetched config.");
      }
    });
  }

  async updateConfig() {
    if (this.config)
      this.edc4AASConfigService.updateConfig(this.provider, this.config).subscribe({
        next: _ => _,
        error: (e) => {
          console.error(e);
          this.addLogMessage("Update config: There was an error. Please check your EDC's output for details.");
        },
        complete: () => {
          console.info('complete');
          this.addLogMessage("Updated config.");
        }
      });
    this.fetchConfig();
  }

  // GUI update function
  async updateConfigValue(key: string, newValue: any) {
    this.config?.set(key, newValue);
  }

  trackByFn(index: any, _item: any) {
    return index;
  }

  isBool(value: any) {
    console.log(value === "true" || value === "false")
    return value === "true" || value === "false";
  }

  async toggle(key: string) {
    if (this.config?.get(key) === "true") {
      this.config.set(key, "false");
    }
    else if (this.config?.get(key) === "false") {
      this.config?.set(key, "true");
    }
  }

  async addLogMessage(message: String) {
    var newLog = this.newestLog + "\n" + this.log;
    this.log = newLog;
    this.newestLog = new Date().toLocaleString() + ": " + message;
  }

}
